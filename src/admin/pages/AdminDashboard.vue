<template>
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welkom! Dit is het admin overzicht.</p>

    <h2>Gebruikers</h2>

    <table v-if="users.length">
      <thead>
        <tr>
          <th>Email</th>
          <th>Admin</th>
          <th>Status</th>
          <th>Actie</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? "Ja" : "Nee" }}</td>
          <td>
            <span :class="{ blocked: user.isBlocked }">
              {{ user.isBlocked ? "Geblokkeerd" : "Actief" }}
            </span>
          </td>
          <td>
            <button @click="toggleBlock(user)">
              {{ user.isBlocked ? "Deblokkeer" : "Blokkeer" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Geen gebruikers gevonden.</p>

    <h2>Zakken</h2>

    <table v-if="bags.length">
      <thead>
        <tr>
          <th>Naam</th>
          <th>Kleur</th>
          <th>Font</th>
          <th>Pattern</th>
          <th>Packaging</th>
          <th>Inspiratie</th>
          <th>Smaken</th>
          <th>Gemaakt door</th>
          <th>Votes</th>
          <th>Actie</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="bag in bags" :key="bag._id">
          <td>{{ bag.name }}</td>
          <td>{{ bag.bagColor }}</td>
          <td>{{ bag.font }}</td>
          <td>{{ bag.pattern }}</td>
          <td>{{ bag.packaging }}</td>
          <td>{{ bag.inspiration }}</td>
          <td>
            <span v-for="(flavour, index) in bag.keyFlavours" :key="index">
              {{ flavour }}<span v-if="index < bag.keyFlavours.length - 1">, </span>
            </span>
          </td>
          <td>{{ bag.user || "Onbekend" }}</td>
          <td>{{ voteCounts[bag._id] ?? 0 }}</td>
          <td>
            <button class="danger" @click="deleteBag(bag._id)">
              Verwijder
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Geen zakken gevonden.</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import axios from "axios"
import { io } from "socket.io-client"

const users = ref([])
const bags = ref([])
const voteCounts = ref({})

const socket = io("https://lays-api-1.onrender.com")

socket.on("vote-updated", data => {
  voteCounts.value[data.bagId] = data.count
})

const fetchUsers = async () => {
  const token = localStorage.getItem("token")
  const res = await axios.get(
    "https://lays-api-1.onrender.com/api/v1/user",
    { headers: { Authorization: `Bearer ${token}` } }
  )
  users.value = res.data
}

const toggleBlock = async user => {
  const token = localStorage.getItem("token")
  await axios.patch(
    `https://lays-api-1.onrender.com/api/v1/user/${user._id}/block`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  )
  user.isBlocked = !user.isBlocked
}

const fetchBags = async () => {
  const token = localStorage.getItem("token")
  const res = await axios.get(
    "https://lays-api-1.onrender.com/api/v1/bag",
    { headers: { Authorization: `Bearer ${token}` } }
  )
  bags.value = res.data
  bags.value.forEach(bag => {
    voteCounts.value[bag._id] = bag.votes || 0
  })
}

const deleteBag = async bagId => {
  if (!confirm("Weet je zeker dat je deze zak wil verwijderen?")) return
  const token = localStorage.getItem("token")
  await axios.delete(
    `https://lays-api-1.onrender.com/api/v1/bag/${bagId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  bags.value = bags.value.filter(bag => bag._id !== bagId)
  delete voteCounts.value[bagId]
}

onMounted(() => {
  fetchUsers()
  fetchBags()
})

onUnmounted(() => {
  socket.disconnect()
})
</script>

<style scoped>
h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

h2 {
  margin-top: 40px;
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  vertical-align: top;
}

button {
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: #ffcc00;
  font-weight: 600;
}

button:hover {
  background: #e5b800;
}

.danger {
  background: #e53935;
  color: white;
}

.danger:hover {
  background: #c62828;
}

.blocked {
  color: red;
  font-weight: bold;
}
</style>

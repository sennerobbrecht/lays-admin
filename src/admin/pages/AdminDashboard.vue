<template>
  <div>
    <h1>Admin Dashboard</h1>
    <p>Welkom! Dit is het admin overzicht.</p>

    <!-- ================= USERS ================= -->
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

    <!-- ================= BAGS ================= -->
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
          <td>{{ getVoteCount(bag._id) }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>Geen zakken gevonden.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);
const bags = ref([]);
const votes = ref([]);

// ---------------- USERS ----------------
const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://lays-api-1.onrender.com/api/v1/user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    users.value = res.data;
  } catch (err) {
    console.error("Users ophalen mislukt", err);
  }
};

const toggleBlock = async (user) => {
  try {
    const token = localStorage.getItem("token");

    await axios.patch(
      `https://lays-api-1.onrender.com/api/v1/user/${user._id}/block`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // optimistic update
    user.isBlocked = !user.isBlocked;
  } catch (err) {
    console.error("Blokkeren mislukt", err);
  }
};

// ---------------- BAGS ----------------
const fetchBags = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://lays-api-1.onrender.com/api/v1/bag",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    bags.value = res.data;
  } catch (err) {
    console.error("Bags ophalen mislukt", err);
  }
};

// ---------------- VOTES ----------------
const fetchVotes = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "https://lays-api-1.onrender.com/api/v1/vote",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    votes.value = res.data;
  } catch (err) {
    console.error("Votes ophalen mislukt", err);
  }
};

// helper: aantal votes per bag
const getVoteCount = (bagId) => {
  return votes.value.filter((vote) => vote.bag === bagId).length;
};

onMounted(() => {
  fetchUsers();
  fetchBags();
  fetchVotes();
});
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

.blocked {
  color: red;
  font-weight: bold;
}
</style>

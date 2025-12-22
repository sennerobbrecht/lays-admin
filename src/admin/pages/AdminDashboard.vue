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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const users = ref([]);

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

    // lijst opnieuw laden
    fetchUsers();
  } catch (err) {
    console.error("Blokkeren mislukt", err);
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

h2 {
  margin-top: 30px;
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

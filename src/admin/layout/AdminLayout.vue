<template>
  <div class="admin-layout">
    <header class="admin-header">
      <h2>Admin Panel</h2>

      <button @click="logout" class="logout-btn">
        Logout
      </button>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isAdmin");
  localStorage.removeItem("userEmail");

  router.push("/login");
};
</script>

<style scoped>
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px;
  background: #1f1f1f;
  color: white;
}

.logout-btn {
  background: #ffcc00;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}

.logout-btn:hover {
  background: #e5b800;
}

main {
  padding: 30px;
}
</style>

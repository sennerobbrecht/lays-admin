<template>
  <div class="login-container">
    <div class="login-card">
      <h2 class="title">Admin Login</h2>

      <form @submit.prevent="loginUser">
        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="admin@admin.com" required />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Password" required />
        </div>

        <button type="submit" class="btn-login">Login</button>
      </form>

      <p class="error" v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref(null);
const router = useRouter();

const loginUser = () => {
  if (email.value === "admin@admin.com" && password.value === "Admin") {
    localStorage.setItem("isAdmin", "true");
    router.push("/admin");
  } else {
    error.value = "Incorrect credentials";
  }
};
</script>

<style scoped>
/* Fullscreen center */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f4f7;
  padding: 20px;
}

/* Card */
.login-card {
  background: white;
  width: 420px;
  padding: 40px 45px;
  border-radius: 12px;
  box-shadow: 0px 8px 25px rgba(0, 0, 0, 0.08);
}

/* Title */
.title {
  text-align: center;
  margin-bottom: 25px;
  font-size: 26px;
  font-weight: 700;
  color: #1f1f1f;
}

/* Inputs */
.input-group {
  margin-bottom: 18px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 15px;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #d1d1d1;
  font-size: 15px;
}

/* Button */
.btn-login {
  width: 100%;
  background: #ffcc00;
  color: #1f1f1f;
  padding: 14px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-login:hover {
  background: #e5b800;
}

/* Error */
.error {
  margin-top: 15px;
  color: red;
  text-align: center;
}
</style>

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
import axios from "axios";

const email = ref("");
const password = ref("");
const error = ref(null);
const router = useRouter();

const loginUser = async () => {
  error.value = null;

  try {
    const res = await axios.post(
      "https://lays-api-1.onrender.com/api/v1/user/login",
      {
        email: email.value,
        password: password.value,
      }
    );


    const { token, user } = res.data;

    if (!user || user.isAdmin !== true) {
      error.value = "You are not authorized as admin";
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("isAdmin", "true");
    localStorage.setItem("userEmail", user.email);

    router.push("/admin");

  } catch (err) {
    error.value = "Invalid email or password";
  }
};
</script>



<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f4f7;
  padding: 20px;
}


.login-card {
  background: white;
  width: 520px;         
  padding: 55px 60px; 
  border-radius: 14px;
  box-shadow: 0px 12px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
}


.title {
  margin-bottom: 35px;
  font-size: 32px;      
  font-weight: 700;
  color: #1f1f1f;
}


.input-group {
  margin-bottom: 22px;
  text-align: left;
}

.input-group label {
  display: block;
  margin-bottom: 7px;
  font-size: 16px;
  color: #555;
}

.input-group input {
  width: 100%;
  padding: 15px;          
  border-radius: 10px;    
  border: 1px solid #cccccc;
  font-size: 16px;      
}


.btn-login {
  width: 100%;
  background: #ffcc00;
  color: #1f1f1f;
  padding: 16px;         
  border: none;
  border-radius: 10px;
  font-weight: 700;
  font-size: 18px;
  cursor: pointer;
  transition: 0.2s;
}

.btn-login:hover {
  background: #e5b800;
}


.error {
  margin-top: 20px;
  color: #d40000;
  font-size: 16px;
}

</style>

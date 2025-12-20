import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../layout/AdminLayout.vue";
import AdminDashboard from "../pages/AdminDashboard.vue";
import Login from "../pages/LoginPage.vue";


const routes = [
      {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", name: "AdminDashboard", component: AdminDashboard }
    ]
  }
];

export const adminRouter = createRouter({
  history: createWebHistory(),
  routes,
});

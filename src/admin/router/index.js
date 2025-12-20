import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../layout/AdminLayout.vue";
import AdminDashboard from "../pages/AdminDashboard.vue";

const routes = [
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

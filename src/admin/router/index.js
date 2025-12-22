import { createRouter, createWebHistory } from "vue-router";
import AdminLayout from "../layout/AdminLayout.vue";
import AdminDashboard from "../pages/AdminDashboard.vue";
import Login from "../pages/LoginPage.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/admin",
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      {
        path: "",
        name: "AdminDashboard",
        component: AdminDashboard,
      },
    ],
  },
];

export const adminRouter = createRouter({
  history: createWebHistory(),
  routes,
});


adminRouter.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  if (to.meta.requiresAdmin) {
    if (!token || isAdmin !== "true") {
      return next("/login");
    }
  }

  next();
});

import Vue from "vue";
import VueRouter from "vue-router";
import addProduct from "../Views/ProductView.vue";
import home from "../Views/PageView.vue";
import SignUp from "@/components/SignUp.vue";
import LoginPage from "@/components/LoginPage.vue";
import Admin from "@/components/SuperAdmin.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
    meta: {
      requiresAuth: true,
      allowedRoles: ["user"],
    },
  },
  {
    path: "/addProduct",
    name: "addProduct",
    component: addProduct,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/SignUp",
    name: "signUp",
    component: SignUp,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
    meta: {
      requiresAuth: true,
      allowedRoles: ["admin"],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("user-info");
  const userRole = isAuthenticated ? JSON.parse(isAuthenticated).role : null;
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next({ name: "login" });
      return;
    }
    if (to.meta.allowedRoles && !to.meta.allowedRoles.includes(userRole)) {
      next({ name: "login" });
      return;
    }
  }
  next();
});

export default router;

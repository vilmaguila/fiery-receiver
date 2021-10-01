import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import { authStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(function (to, _, next) {
  const store = authStore();
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    next("/auth");
  } else if (to.meta.requiresUnauth && store.isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;

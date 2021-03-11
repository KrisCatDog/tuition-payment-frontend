import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import useAuth from "@/composables/useAuth";

const { isLoggedIn } = useAuth();

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  const isAuthenticated = await isLoggedIn();

  if (to.meta.requiresAuth && !isAuthenticated) {
    return {
      path: "/login",
    };
  }

  if (!to.meta.requiresAuth && isAuthenticated) {
    return {
      path: "/",
    };
  }
});

export default router;

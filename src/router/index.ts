import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/index",
    },
    {
      path: "/index",
      component: () => import("@/views/admin/AdminIndex.vue"),
      children: [
        {
          path: "/user_message",
          component: () => import("@/views/admin/UserMessage.vue"),
        },
      ],
    },
    {
      path: "/login",
      component: () => import("@/views/admin/AdminLogin.vue"),
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

export default router;

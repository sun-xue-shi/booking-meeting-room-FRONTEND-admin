import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/main",
      component: () => import("@/views/admin/AdminMain.vue"),
      children: [
        {
          path: "/menu",
          component: () => import("@/views/admin/children/AdminMenu.vue"),
          children: [
            {
              path: "/user_message",
              component: () => import("@/views/admin/children/UserMessage.vue"),
            },
          ],
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

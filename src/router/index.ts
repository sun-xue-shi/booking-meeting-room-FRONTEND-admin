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
          path: "/show_menu",
          component: () => import("@/views/admin/AdminMenu.vue"),
          children: [
            {
              path: "user_manage",
              component: () => import("@/views/admin/children/UserMessage.vue"),
            },
            {
              path: "booking_manage",
              component: () =>
                import("@/views/admin/children/BookingManage.vue"),
            },
            {
              path: "meetingroom_manage",
              component: () =>
                import("@/views/admin/children/MeetingRoomManage.vue"),
            },
            {
              path: "statistics",
              component: () =>
                import("@/views/admin/children/StatisticsSum.vue"),
            },
          ],
        },
        {
          path: "/update_menu",
          component: () => import("@/views/update/UpdateMenu.vue"),
          children: [
            {
              path: "info",
              component: () => import("@/views/update/children/UpdateInfo.vue"),
            },
            {
              path: "password",
              component: () =>
                import("@/views/update/children/UpdatePassword.vue"),
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

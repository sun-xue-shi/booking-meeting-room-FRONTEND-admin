import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("@/views/Home.vue"),
    },
    {
      path: "/ip-diagnosis",
      component: () => import("@/views/IpDiagnosis.vue"),
    },
    {
      path: "/learning-center",
      component: () => import("@/views/LearningCenter.vue"),
    },
    {
      path: "/service-operation",
      component: () => import("@/views/ServiceOperation.vue"),
    },
    {
      path: "/business-connection",
      component: () => import("@/views/BusinessConnection.vue"),
    },
    
    {
      path: "/login",
      component: () => import("@/views/Login.vue"),
    },
    
    
    {
      path: "/:pathMatch(.*)",
      component: () => import("@/views/NotFound.vue"),
    },
  ],
});

// 路由守卫
defineRouteGuard();

function defineRouteGuard() {
  router.beforeEach((to, from, next) => {
    // 需要登录的页面
    if (to.meta.requiresAuth) {
      const token = localStorage.getItem('access_token');
      if (token) {
        next();
      } else {
        next('/login');
      }
    } else {
      next();
    }
  });
}

export default router;

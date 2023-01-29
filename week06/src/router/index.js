import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/Front",
      component: () => import("../views/Front/FrontView.vue"),
      children: [
        {
          path: 'HomeView',
          component: () => import("../views/Front/HomeView.vue")
        },
        {
          path: 'ProductsView',
          component: () => import("../views/Front/ProductsView.vue")
        },
        {
          path: 'ProductView/:id',
          component: () => import('../views/Front/ProductView.vue')
        },
        {
          path: 'CartView',
          component: () => import('../views/Front/CartView.vue')
        }
      ]
    },
    {
      path: "/Admin",
      component: () => import("../views/Admin/AdminView.vue"),
      children: [
        {
          path: 'AdminProducts',
          component: () => import("../views/Admin/ProductsView.vue")
        },
        {
          path: 'AdminOrders',
          component: () => import("../views/Admin/AdminOrder.vue")
        }
      ]
    }
  ],
});

export default router;

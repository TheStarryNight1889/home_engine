import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import { authGuard } from '@auth0/auth0-vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      beforeEnter: authGuard
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }
  ]
})

export default router

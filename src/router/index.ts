import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/dashGiocatore',
      name: 'DashboardGiocatore',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DashboardGiocatore.vue'),
    },
    {
      path: '/dashCircolo',
      name: 'DashboardCircolo',
      component: () => import('../views/DashboardCircolo.vue')
    },
    {
      path: '/RegistrazioneCircolo',
      name: 'RegistrazioneCircolo',
      component: () => import('@/views/RegistrazioneCircolo.vue')
    },
    {
      path: '/AreaCircolo',
      name: 'AreaCircolo',
      component: () => import('@/views/AreaCircolo.vue')
    }
  ],
  linkActiveClass: 'active'
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/dashGiocatore',
      name: 'DashboardGiocatore',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/DashboardGiocatore.vue'),
    },
    {
      path: '/dashCircolo',
      name: 'DashboardCircolo',
      component: () => import('@/views/DashboardCircolo.vue')
    },
    {
      path: '/partite/circolo/:circolo/data/:year/:month/:day/:hour/:minutes/',
      name: "PartiteSlot",
      component: () => import('@/views/ListaPartiteSlot.vue')
    },
    {
      path: '/partita/:idPartita/',
      name: "InfoPartita",
      component: () => import('@/views/InfoPartita.vue')
    },
    {
      path: '/RegistrazioneCircolo',
      name: 'RegistrazioneCircolo',
      component: () => import('@/views/RegistrazioneCircolo.vue')
    },
    {
      path: '/RegistrazioneGiocatore',
      name: 'RegistrazioneGiocatore',
      component: () => import('@/views/RegistrazioneGiocatore.vue')
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

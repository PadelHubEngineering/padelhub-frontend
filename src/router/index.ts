import { TipoAccount, useAuthUserStore } from '@/stores/authStore';
import { inject } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiredAccount: null }
    },
    {
      path: '/dashGiocatore',
      name: 'DashboardGiocatore',
      component: () => import('@/views/DashboardGiocatore.vue'),
      meta: { requiredAccount: [ TipoAccount.Giocatore ]}
    },
    {
      path: '/dashCircolo',
      name: 'DashboardCircolo',
      component: () => import('@/views/DashboardCircolo.vue'),
      meta: { requiredAccount: [ TipoAccount.Circolo ]}
    },
    {
      path: '/partite/circolo/:circolo/data/:year/:month/:day/:hour/:minutes/',
      name: "PartiteSlot",
      component: () => import('@/views/ListaPartiteSlot.vue'),
      meta: { requiredAccount: [ TipoAccount.Giocatore ] }
    },
    {
      path: '/partita/:idPartita/',
      name: "InfoPartita",
      component: () => import('@/views/InfoPartita.vue'),
      meta: { requiredAccount: [ TipoAccount.Giocatore ] }
    },
    {
      path: '/RegistrazioneCircolo',
      name: 'RegistrazioneCircolo',
      component: () => import('@/views/RegistrazioneCircolo.vue'),
      meta: { requiredAccount: null }
    },
    {
      path: '/RegistrazioneGiocatore',
      name: 'RegistrazioneGiocatore',
      component: () => import('@/views/RegistrazioneGiocatore.vue'),
      meta: { requiredAccount: null }
    },
    {
      path: '/AreaCircolo',
      name: 'AreaCircolo',
      component: () => import('@/views/AreaCircolo.vue'),
      meta: { requiredAccount: [ TipoAccount.Circolo ] }
    },
    {
      path: '/RicercaCircoli',
      name: 'RicercaCircoli',
      component: () => import('@/views/RicercaCircoli.vue'),
      meta: { requiredAccount: [ TipoAccount.Giocatore ] }
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import("@/views/NotFound.vue") },
  ],
  linkActiveClass: 'active'
})

router.beforeEach(async (to, from_route) => {

  const authUserStore = useAuthUserStore();

  // console.log(authUserStore.authenticated)
  // console.log( from_route.query )

  if( to.meta.requiredAccount !== null && !authUserStore.authenticated )
    return {
      name: "Login",
      // save the location we were at to come back later
      query: { redirect: to.path === "/"? undefined : to.fullPath },
    }

  else if( to.name === "Login" && authUserStore.authenticated ) {

    if( authUserStore.tipoAccount === TipoAccount.Giocatore )
      return { name: "DashboardGiocatore" }

    else if( authUserStore.tipoAccount === TipoAccount.Circolo )
      return { name: "DashboardCircolo" }
  }

  else if ( to.path === "/" )
    return {
      name: "Login"
    }



})

export default router

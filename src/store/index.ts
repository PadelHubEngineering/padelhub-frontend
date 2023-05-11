import { createStore } from 'vuex'
import auth from './auth/index'
import VuexPersistence from "vuex-persist"

import type { State } from "vue"

const localStorageVuex = new VuexPersistence<State>({
  storage: window.localStorage
})

export default createStore<State>({

    state: {

    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth
    },
    plugins: [
        localStorageVuex.plugin
    ]
})

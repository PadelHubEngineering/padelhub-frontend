import type { State } from "vue"
import { defineStore } from "pinia"
import { useStorage } from '@vueuse/core'

export enum TipoAccount {
    Giocatore = "Giocatore",
    Circolo = "Circolo",
    OperatoreCustomerService = "OperatoreCustomerService",
    Ammininstratore = "Amministratore"
}

export const useAuthUserStore = defineStore("authUser", {
    state: (): State => ({
        authenticated: useStorage("authenticated", false),
        email: useStorage("email", ""),
        nome: useStorage("nome", ""),
        tipoAccount: useStorage("tipoAccount", null),
        token: useStorage("token", "")
    }),
    actions: {
        logout() {
            this.$reset();
        }
    },
    getters: {}
})

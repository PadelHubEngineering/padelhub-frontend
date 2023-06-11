import { defineStore } from "pinia"
import { useStorage } from '@vueuse/core'
import type { Ref } from "vue"

export enum TipoAccount {
    Giocatore = "Giocatore",
    Circolo = "Circolo",
    OperatoreCustomerService = "OperatoreCustomerService",
    Ammininstratore = "Amministratore"
}

type State = {
    authenticated: Ref<boolean>,
    email: Ref<string>,
    nome: Ref<string>,
    tipoAccount: Ref<TipoAccount | null>,
    token: Ref<string>
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
            localStorage.clear();
            this.$reset();
        }
    },
    getters: {}
})

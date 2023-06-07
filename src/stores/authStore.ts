import type { State } from "vue"
import getters from "./getters"
import mutations from "./mutations"
import { defineStore } from "pinia"



export enum TipoAccount {
    Giocatore = "Giocatore",
    Circolo = "Circolo",
    OperatoreCustomerService = "OperatoreCustomerService",
    Ammininstratore = "Amministratore"
}

export const useAuthUserStore = defineStore("authUser", {
    state: (): State => ({
        authenticated: false,
        email: "",
        nome: "",
        tipoAccount: null,
        token: ""
    }),
    actions: {
        logout() {
            this.$reset();
        }
    },
    getters: {}
})

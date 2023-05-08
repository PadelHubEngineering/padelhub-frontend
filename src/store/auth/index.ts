import type { State } from "vue"
import getters from "./getters"
import mutations from "./mutations"



export enum TipoAccount {
    Gicocatore = "Giocatore",
    Circolo = "Circolo",
    OperatoreCustomerService = "OperatoreCustomerService",
    Ammininstratore = "Amministratore"
}

export default {
    namespaced: true,
    state() {
        return {
            authenticated: false,
            email: "",
            nome: "",
            tipoAccount: null,
            token: ""
        } as State
    }, 
    mutations,
    getters
}
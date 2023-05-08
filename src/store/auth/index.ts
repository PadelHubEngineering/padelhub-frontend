import type { State } from "vue"
import getters from "./getters"
import mutations from "./mutations"



export enum TipoAccount {
    Gicocatore,
    Circolo,
    OperatoreCustomerService,
    Ammininstratore
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
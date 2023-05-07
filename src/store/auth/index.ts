import getters from "./getters"
import mutations from "./mutations"

export type State = {
    authenticated: boolean,
    email: string
    nome: string
    tipoAccount: TipoAccount | null
    token: string
}

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
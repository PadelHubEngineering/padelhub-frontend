import type { State, TipoAccount } from ".";

export default {

    setAuthenticated(state:State, autenticazione: boolean){
        state.authenticated = autenticazione
    },

    setEmail(state:State, email:string){
        state.email = email
    },
    setNome(state:State, nome:string){
        state.nome = nome
    },
    setTipoAccount(state:State, tipoAccount:TipoAccount){
        state.tipoAccount = tipoAccount
    },
    setToken(state:State, token:string){
        state.token = token
    }
    
}
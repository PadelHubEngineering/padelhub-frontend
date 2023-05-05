import getters from "./getters"
import mutations from "./mutations"

export type State = {
    authenticated: boolean,
    username: string
}

export default {
    namespaced: true,
    state() {
        return {
            authenticated: false,
            username: ""
        } as State
    }, 
    mutations,
    getters
}
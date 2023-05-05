import type { State } from ".";

export default {
    getAuthenticated(state: State){
        return state.authenticated
    },

    getUsername(state: State){
        return state.username
    }
}
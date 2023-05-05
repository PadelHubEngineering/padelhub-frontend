import type { State } from ".";

export default {
    setAuthenticated(state: State, authenticated: any) {
        state.authenticated = authenticated
    },
    setUsername(state: State, username: any) {
        state.username = username
    }
}
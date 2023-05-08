import { Store } from 'vuex'

declare module '@vue/runtime-core' {
  // declare your own store states
    interface State {
        authenticated: boolean,
        email: string
        nome: string
        tipoAccount: TipoAccount | null
        token: string
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}


<template>
    <button class="shadow bg-bluPadelHub enabled:hover:bg-bluPadelHubHover text-white font-bold py-3 w-full rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed" v-on:click.prevent = "logout()">Logout</button>
</template>

<script lang='ts'>

    export default {
        name: "LogoutComponent",
        methods: {
            logout() {
                // Azzero lo stato nello store
                this.$store.commit(`auth/setAuthenticated`, false)
                this.$store.commit(`auth/setEmail`, "")
                this.$store.commit(`auth/setNome`, "")
                this.$store.commit(`auth/setTipoAccount`, "")
                this.$store.commit(`auth/setToken`, "")

                this.$router.push("/login")
            }
        }
    }
</script>

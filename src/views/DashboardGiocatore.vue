<script lang="ts">
    export default {
        name: 'DashboardGiocatore',
        data() {
            return {}
        },
        methods: {
            getUsername(): string {
                return this.$store.state.auth.nome;
            }
        }
    }
</script>


<template>
    <h3>Welcome Giocatore {{ getUsername() }}</h3>
</template>





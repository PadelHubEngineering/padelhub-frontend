<script lang="ts">
    export default {
        name: 'DashboardCircolo',
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
    <h3>Welcome Circolo {{ getUsername() }}</h3>
</template>
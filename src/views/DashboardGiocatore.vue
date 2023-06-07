<script setup lang="ts">
    import { useAuthUserStore } from '@/stores/authStore';
    import { computed } from 'vue';

    const userAuthStore = useAuthUserStore();

    const getUsername = computed( () => {
        return userAuthStore.nome;
    } )
</script>


<template>
    <h3>Welcome Giocatore {{ getUsername }}</h3>
</template>





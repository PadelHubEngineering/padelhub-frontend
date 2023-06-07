
<script setup lang='ts'>
    import { useAuthUserStore } from '@/stores/authStore';
    import { useRouter } from 'vue-router';

    const authUserStore = useAuthUserStore();
    const router = useRouter();

    function logout() {
        authUserStore.logout();

        router.push({ name: "Login" })
    }
</script>

<template>
    <button class="shadow bg-bluPadelHub enabled:hover:bg-bluPadelHubHover text-white font-bold py-3 w-full rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed" v-on:click.prevent = "logout()">Logout</button>
</template>


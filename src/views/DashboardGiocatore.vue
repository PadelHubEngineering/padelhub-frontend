<script setup lang="ts">
    import { useAuthUserStore } from '@/stores/authStore';
    import { computed } from 'vue';
    import MobileHeader from "@/components/MobileHeader.vue"
    import { useRouter, RouterLink } from 'vue-router';
    import IconSearch from "@/components/icons/IconSearch.vue"


    const userAuthStore = useAuthUserStore();
    const router = useRouter();

    const buttonClass = "rounded-2xl border-bluPadelHub border-2 text-bluPadelHub px-5 py-7 text-xl"

    const getUsername = computed( () => {
        return userAuthStore.nome;
    } )

    function logout() {
        console.log("logged out")
        userAuthStore.logout();

        console.log(userAuthStore.authenticated)

        router.push({ path: "/" })
    }
</script>


<template>
    <MobileHeader :ready="true" title="Dashboard">
        <template v-slot:leftSide>
            <img src='/img/exit.png' class='h-5/6' v-on:click="logout" />
        </template>
        <template v-slot:rightSide>
            <img src='/img/logoPadelHub.png' v-on:click="router.push({ path: '/' })"/>
        </template>
    </MobileHeader>

    <h3 class='text-3xl px-2 py-4 text-center w-full'>Ciao {{ getUsername }}!</h3>

    <button
        class='rounded-2xl bg-bluPadelHub p-2 widthFullNoM flex items-center'
        v-on:click.prevent="router.push({ name: 'RicercaCircoli' })"
    >
        <IconSearch class='w-10 h-10 text-white fill-white' />
        <span class='block mx-auto text-white text-2xl'> Gioca</span>
    </button>

    <div class='grid-rows-2 grid-cols-2 grid gap-2 p-2'>
        <router-link :class="[ buttonClass ]" :to="{ name: 'PrenotazioniEffettuate' }">Gestione partite</router-link>
        <router-link :class="[ buttonClass ]" :to="{ name: 'CircoliAssociati' }">Circoli associati</router-link>
        <button :class="[ buttonClass ]" >Community</button>
        <button :class="[ buttonClass ]" >Account</button>
    </div>

</template>

<style scoped>
    .widthFullNoM {
        width: calc( 100% - 1rem );
        margin: 3rem 0.5rem;
    }
</style>

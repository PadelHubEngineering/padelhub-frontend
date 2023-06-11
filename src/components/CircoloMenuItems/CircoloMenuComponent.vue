<script setup lang="ts">
    import { ref } from "vue";
    import StructureIcon from "../icons/StructureIcon.vue"
    import ItemWithHeaderIcon from "./ItemWithHeaderIcon.vue"
    import { useAuthUserStore } from "@/stores/authStore";
    import { useRouter } from "vue-router";

    const userAuthStore = useAuthUserStore();
    const router = useRouter();

    const menu = ref([
        {
            title: "Struttura",
            links: [
                { nome: "gestione campi", link: "AreaCircolo" },
                { nome: "informazioni generali", link: "DashCircolo" },
            ],
        },
        {
            title: "iscritti",
            links: [
                { nome: "i miei iscritti", link: "DashCircolo" },
            ],
        },
        {
            title: "Statistiche",
            links: [
                { nome: "le mie statistiche", link: "DashCircolo" },
            ],
        },
        {
            title: "Recensioni",
            links: [
                { nome: "le mie recensioni", link: "DashCircolo" },
            ],
        },
    ])

    function logout() {
        console.log("logged out")
        userAuthStore.logout();

        console.log(userAuthStore.authenticated)

        router.push({ path: "/" })
    }
</script>

<template>
    <div class="menuLaterale bg-bluPadelHub pt-8">

        <img src="/img/logoPadelHub.png" width="150" height="150" class="mx-auto pb-4" />

        <ItemWithHeaderIcon v-for="item in menu" :links="item.links">
            {{ item.title }}
        </ItemWithHeaderIcon>

        <div
            class='flex items-center justify-begin px-4 py-1 gap-3 absolute bottom-3 hover:cursor-pointer'
            v-on:click="logout"
        >

            <img src='/img/exit.png' class='h-6' v-on:click="logout" />
            <span class='text-m text-white'>Logout</span>
        </div>
    </div>
</template>


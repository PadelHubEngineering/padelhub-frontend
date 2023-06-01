<script setup lang="ts">
import { ref } from "vue";
import StructureIcon from "../icons/StructureIcon.vue"
import ItemWithHeaderIcon from "./ItemWithHeaderIcon.vue"

const menu = ref([
    {
        title: "Struttura",
        links: [
            { nome: "gestione campi", link: "/" },
            { nome: "informazioni generali", link: "#" },
        ],
    },
    {
        title: "iscritti",
        links: [
            { nome: "i miei iscritti", link: "#" },
        ],
    },
    {
        title: "Statistiche",
        links: [
            { nome: "le mie statistiche", link: "#" },
        ],
    },
    {
        title: "Recensioni",
        links: [
            { nome: "le mie recensioni", link: "#" },
        ],
    },
])
</script>

<template>
    <div class="menuLaterale bg-bluPadelHub pt-8">

        <img src="/img/logoPadelHub.png" width="150" height="150" class="mx-auto pb-4" />

        <ItemWithHeaderIcon v-for="item in menu" :links="item.links">
            {{ item.title }}
        </ItemWithHeaderIcon>
    </div>
</template>


<script setup lang="ts">
    import StructureIcon from "../icons/StructureIcon.vue"
    import ItemWithHeaderIcon from "./ItemWithHeaderIcon.vue"
</script>

<template>
    <div class="menuLaterale bg-bluPadelHub pt-20 font-circolo">

        <ItemWithHeaderIcon
            v-for="item in this.menu"
            :links="item.links"
        >
            {{ item.title }}
        </ItemWithHeaderIcon>
    </div>
</template>

<script lang='ts'>

    export default {
        name: "CircoloMenuComponent",
        data() {
            return {
                menu: [
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
                ]

            }
        },
        component: [
            StructureIcon,
            ItemWithHeaderIcon
        ]
    }
</script>


<script setup lang='ts'>
    import type { PropType } from "vue";
    import StructureIcon from "../icons/StructureIcon.vue";
</script>

<template>
    <div class="flex mx-7 mt-7 "> 
        <slot name='icon'>
            <StructureIcon class='block w-12 mr-7' />
        </slot>
        <span class='block text-3xl leading-10 uppercase text-white'>
            <slot>Titolo</slot>
        </span>
    </div>
    <router-link
        class="pl-12 pr-7 py-2 my-1 text-2xl hover:bg-white hover:opacity-80 hover:text-bluPadelHub w-full text-left uppercase text-white block"
        v-for="link in links"
        :to="{ path: link.link }"
    >{{ link.nome }}</router-link>
</template>

<script lang="ts">
    export default {
        name: "ItemWithHeaderIcon",
        data() {
            return {}
        },
        props: {
            links: Array as PropType<Array<{
                nome: String,
                href: String
            }>>
        },
        component: [
            StructureIcon
        ]
    }
</script>

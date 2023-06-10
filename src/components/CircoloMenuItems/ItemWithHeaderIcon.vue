
<script setup lang='ts'>
    import type { PropType } from "vue";
    import StructureIcon from "../icons/StructureIcon.vue";

    const props = defineProps({
        links: { type: Array<{ nome: string, link: string }>, required: false }
    })

</script>

<template>
    <div class="flex mx-7 mt-7 "> 
        <slot name='icon'>
            <StructureIcon class='block w-12 mr-7' />
        </slot>
        <span class='block text-3xl leading-10 uppercase text-white font-circolo'>
            <slot>Titolo</slot>
        </span>
    </div>
    <router-link
        class="pl-12 pr-7 py-2 my-1 text-xl hover:bg-white hover:opacity-80 hover:text-bluPadelHub w-full text-left uppercase text-white font-circolo block"
        v-for="link in props.links"
        :to="{ path: link.link }"
    >{{ link.nome }}</router-link>
</template>

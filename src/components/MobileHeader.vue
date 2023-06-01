
<script setup lang='ts'>
import { computed } from 'vue';
import { HeaderIconTypeC } from './UI.types';


    const props = defineProps({
        title: { type: String, required: false },
        iconType: { type: HeaderIconTypeC, required: false }
    })

</script>

<template>

    <div class='w-full bg-bluPadelHub flex justify-between h-20 items-center'>

        <div></div>

        <div v-if='props.title' class='text-2xl text-white uppercase font-bold drop-shadow-lg'>{{ title }}</div>
        <img v-if='!props.title' src='/img/logoPadelHub.png' class='h-5/6'>

        <div></div>

    </div>
</template>

<script setup lang='ts'>
import { computed } from 'vue';
import { HeaderIconTypeC } from './UI.types';
import { useRouter } from 'vue-router';

    const router = useRouter();

    const sidesStyle = "w-10 h-10 mx-3 flex justify-center items-center font-white"

    const props = defineProps({
        title: { type: String, required: false },
        iconType: { type: HeaderIconTypeC, required: false },
        ready: { type: Boolean, required: true }
    })

</script>

<template>

    <div class='w-full bg-bluPadelHub flex justify-between h-20 items-center'>

        <div :class="sidesStyle">
            <slot name='leftSide'></slot>
        </div>

        <div v-if='props.title && props.ready' class='text-2xl text-white uppercase font-bold drop-shadow-lg'>{{ title }}</div>
        <img v-else-if='!props.title' src='/img/logoPadelHub.png' class='h-5/6 cursor-pointer' v-on:click="router.push({ path: '/' })">

        <div :class="sidesStyle">
            <slot name='rightSide'></slot>
        </div>

    </div>
</template>

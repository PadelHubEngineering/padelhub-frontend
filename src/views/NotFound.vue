
<script setup lang='ts'>
    import MobileHeader from '@/components/MobileHeader.vue';
    import ErrorIcon from '@/components/icons/ErrorIcon.vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();

</script>

<template>

    <div>
        <MobileHeader :ready="true" />

        <h1 class='text-4xl text-center mt-4'>Route non trovata</h1>
        <ErrorIcon class='h-full w-5/6 mx-auto'/>

        <button
            class=' rounded-xl px-4 py-3 text-xl w-2/3 mx-auto mt-5 block border-bluPadelHub border-2 text-bluPadelHub'
            v-on:click.prevent="router.push({ path: '/' })"
        >Torna alla home</button>

    </div>


</template>

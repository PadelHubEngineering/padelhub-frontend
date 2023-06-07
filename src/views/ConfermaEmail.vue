
<script setup lang='ts'>
    import MobileHeader from '@/components/MobileHeader.vue';
    import ConfirmationIcon from '@/components/icons/ConfirmationIcon.vue';



</script>

<template>

    <div>
        <MobileHeader :ready="true" />

        <h1 class='text-4xl text-center mt-4'>Email confermata correttamente</h1>
        <ConfirmationIcon />

        <button class=' rounded-xl px-4 py-3 text-xl w-2/3 mx-auto mt-5 block border-bluPadelHub border-2 text-bluPadelHub'>Vai alla home</button>

    </div>


</template>

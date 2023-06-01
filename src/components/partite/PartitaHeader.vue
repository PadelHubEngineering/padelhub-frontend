
<script setup lang='ts'>

    const props = defineProps({
        nomeCircolo: { type: String, required: false },
        iscritto: { type: Boolean, required: false }
    })

</script>


<template>
    <div class='flex justify-between mx-2 my-4 text-lg'>
        <div class='flex justify-center items-center'>
            <img src='/img/icona_indirizzo.png' width="32" height='32' class='mr-1'/>
            {{ props.nomeCircolo || "" }}
        </div>
        <i @if="iscritto" class='flex items-center text-xl'> Iscritto </i>
    </div>
</template>

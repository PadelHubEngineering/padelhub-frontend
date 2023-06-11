
<script setup lang='ts'>
import { computed } from 'vue';


    const props = defineProps({
        dataOraInizioPartita: { type: Date, required: true },
        oraFinePartita: { type: Date, required: true },
        tipoCampo: { type: String, required: true }
    })

    const dataInizio = computed( () => {

        if ( !props.dataOraInizioPartita ) return ""


        return `${props.dataOraInizioPartita.getDate().toString().padStart(2, "0")}/${(props.dataOraInizioPartita.getMonth() + 1).toString().padStart(2, "0")}/${props.dataOraInizioPartita.getFullYear()}`
    } )

    const oraSlot = computed( () => {

        if ( !props.dataOraInizioPartita || !props.oraFinePartita ) return ""

        const oraInizio = `${props.dataOraInizioPartita.getUTCHours().toString().padStart(2, "0")}:${props.dataOraInizioPartita.getUTCMinutes().toString().padStart(2, "0")}`
        const oraFine = `${props.oraFinePartita.getUTCHours().toString().padStart(2, "0")}:${props.oraFinePartita.getUTCMinutes().toString().padStart(2, "0")}`

        return `${oraInizio} - ${oraFine}`
    })

</script>


<template>
    <div class='flex flex-col rounded-2xl bg-bluPadelHub text-white mx-2 mb-2 mt-4 p-3 text-xl'>
        <div class='flex justify-between w-full mb-1'>
            <div>{{ dataInizio }}</div>
            <div>{{ oraSlot }}</div>
        </div>
        <div class='uppercase w-full text-center'>
            Campo {{ props.tipoCampo }}
        </div>
    </div>
</template>

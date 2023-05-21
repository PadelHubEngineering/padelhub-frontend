
<script setup lang='ts'>
    import { computed, onMounted, ref } from "vue";
    import AccountIcon from "../icons/AccountIcon.vue"

    import type { Ref } from "vue"
import axios from "axios";


    type Giocatore = {
        nome: string
    }

    type Partita = {
        categoria_min: number,
        categoria_max: number,
        giocatori: Giocatore[]
    }

    const props = defineProps([ "id_partita" ])

    let partita: Ref<Partita> = ref({
        categoria_min: 6,
        categoria_max: -1,
        giocatori: []
    })

    async function loadPartita() {
        if( props.id_partita === "" || !props.id_partita) return
        console.log(`tento scaricamento dati partita: ${props.id_partita}`)

        let response;

        try{
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/partite/${props.id_partita}`
            )
        } catch (error: any) {
            console.log("Impossibile scaricare partita " + error.response.data.status)
            return false;
        }

        console.log(response)

        if ( response === undefined || !response.data.success ){
            console.log("Impossibile scaricare partita " + ( response?.data.message || "Errore generico" ))
            return false;
        } else {

            partita.value = response.data.payload;

        }
    }

    let dot1 = computed(() => {
        if( partita.value )
            if ( partita.value.categoria_min <= 1 )
                return "bg-accentPadelHub"
            else
                return "bg-simpleGrey text-simpleGrey"
    })
    let dot2 = computed(() => {
        if( partita.value )
            if ( partita.value.categoria_min > 2 || partita.value.categoria_max < 2 )
                return "bg-simpleGrey text-simpleGrey"
            else
                return "bg-accentPadelHub"
    })
    let dot3 = computed(() => {
        if( partita.value )
            if ( partita.value.categoria_min > 3 || partita.value.categoria_max < 3 )
                return "bg-simpleGrey text-simpleGrey"
            else
                return "bg-accentPadelHub"
    })
    let dot4 = computed(() => {
        if( partita.value )
            if ( partita.value.categoria_min > 4 || partita.value.categoria_max < 4 )
                return "bg-simpleGrey text-simpleGrey"
            else
                return "bg-accentPadelHub"
    })
    let dot5 = computed(() => {
        if( partita.value )
            if ( partita.value.categoria_min > 5 || partita.value.categoria_max < 5 )
                return "bg-simpleGrey text-simpleGrey"
            else
                return "bg-accentPadelHub"
    })

    onMounted(async () => {

        await loadPartita()
    })

</script>

<template>

    <div class="p-4 flex flex-col">

        <div class='flex justify-evenly py-3'>
            <div :class='dot1' class="rounded-full w-10 h-10 block text-center align-text text-xl font-semibold ">1</div>
            <div :class='dot2' class="rounded-full w-10 h-10 block text-center align-text text-xl font-semibold ">2</div>
            <div :class='dot3' class="rounded-full w-10 h-10 block text-center align-text text-xl font-semibold ">3</div>
            <div :class='dot4' class="rounded-full w-10 h-10 block text-center align-text text-xl font-semibold ">4</div>
            <div :class='dot5' class="rounded-full w-10 h-10 block text-center align-text text-xl font-semibold ">5</div>
        </div>

        <div v-for="giocatore in partita.giocatori" class='flex items-center py-3'>
            <AccountIcon />
            <p class='px-2'>{{ giocatore.nome }}</p>
        </div>

    </div>



</template>


<style>
    .align-text {
        line-height: 2.5rem
    }
</style>

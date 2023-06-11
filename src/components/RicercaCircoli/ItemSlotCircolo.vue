<script setup lang='ts'>
    import { computed, ref, type PropType, type Ref} from 'vue';
    import { DateTime } from "luxon"
    import { useRouter } from 'vue-router';
    import { CircoloRetI } from '../partite/Partita.types';


    enum Color {
        Green = "greenFree",
        Yellow = "yellowReserved",
        Red = "redBusy"
    }

    const props = defineProps({
        dataInizio: { type: Date, required: true },
        dataFine: { type: Date, required: true },
        idCircolo: { type: String, required: true },
        colore: { type: String as PropType<Color>, required: true}
    })

    const router = useRouter()

   // const color: Ref<Color> = ref(Color.Red)


    function navigateListaPartite() {
        console.log("DataInizio: " + props.dataInizio)
        console.log("DataFine: " + props.dataFine)
    // path: '/partite/circolo/:circolo/data/:year/:month/:day/:hour/:minutes/',
        router.push({ name: "PartiteSlot",
            params: {
                circolo: props.idCircolo,
                year: props.dataInizio.getFullYear().toString(),
                month: ( props.dataInizio.getMonth() + 1 ).toString(),
                day: props.dataInizio.getDate().toString(),
                hour: props.dataInizio.getHours().toString(),
                minutes: props.dataInizio.getMinutes().toString(),
            }
        })
    }

    const oraInizio = computed( () => {
    
        if ( !props.dataInizio ) return ""

        return `${props.dataInizio.getHours().toString().padStart(2, "0")}:${props.dataInizio.getMinutes().toString().padStart(2, "0")}`
    } )

    const oraFine = computed( () => {

        if ( !props.dataFine ) return ""

        return `${props.dataFine.getHours().toString().padStart(2, "0")}:${props.dataFine.getMinutes().toString().padStart(2, "0")}`
    } )

</script>

<template>

    <!-- Caso in cui lo slot è disponibile -->
    <button
        type="button"
        :class="`bg-${props.colore}`"
        class= "border-2 border-bluPadelHub rounded-lg px-12 py-10 text-bluPadelHub flex flex-col leading-4 items-center justify-center"

        v-on:click.prevent="navigateListaPartite"
    >

        <span>{{ oraInizio }}</span>
        <span>-</span>
        <span>{{ oraFine }}</span>
    </button>

</template>

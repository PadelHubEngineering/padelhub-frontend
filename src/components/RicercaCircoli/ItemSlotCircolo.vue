

<script setup lang='ts'>
    import { computed, ref, type Ref } from 'vue';
    import { DateTime } from "luxon"
import { useRouter } from 'vue-router';


    enum Color {
        Green = "Green",
        Yellow = "Yellow",
        Red = "Red"
    }

    const props = defineProps({
        dataInizio: { type: Date, required: true },
        dataFine: { type: Date, required: true },
        idCircolo: { type: String, required: true }
    })
    const router = useRouter()

    const color: Ref<Color> = ref(Color.Red)


    function navigateListaPartite() {

    // path: '/partite/circolo/:circolo/data/:year/:month/:day/:hour/:minutes/',
    // name: "PartiteSlot",
        router.push({ name: "PartiteSlot",
            params: {
                circolo: props.idCircolo,
                year: props.dataInizio.getFullYear().toString(),
                month: props.dataInizio.getMonth().toString(),
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
        :class="{ 'bg-greenFree': color === Color.Green,'bg-yellowReserved': color === Color.Yellow, 'bg-redBusy': color === Color.Green, }"
        class= "border-2 border-bluPadelHub rounded-lg px-12 py-10 text-bluPadelHub flex flex-col leading-4 items-center justify-center"

        v-on:click.prevent="navigateListaPartite"
    >

        <span>{{ oraInizio }}</span>
        <span>-</span>
        <span>{{ oraFine }}</span>
    </button>

</template>

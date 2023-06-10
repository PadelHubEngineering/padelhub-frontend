<script setup lang="ts">
    import {TipoCampo} from "./TipoCampo.types"
    import {computed, ref} from 'vue'
    import ItemSlotCircolo from "@/components/RicercaCircoli/ItemSlotCircolo.vue"
    import { DateTime, Interval } from "luxon"

    const campoButton = "campi";

    enum Color {
        Green = "greenFree",
        Yellow = "yellowReserved",
        Red = "redBusy"
    }

    const props = defineProps(['tipo', 'date']);

    const isOpen = ref(false)

    function findDatiSlot(){

        

    }


    const datiSlotCircolo = ref({
        "circolo": {
            _id: '647cc2d139db5e20457b309e',
            "orarioApertura": "1899-12-31T08:00:00.000Z",
            "orarioChiusura": "1899-12-31T17:00:00.000Z",
            "durataSlot": 90
        },
        "slots": [
            {
                "inizioSlot": "2023-07-09T08:00:00.000Z",
                "fineSlot": "2023-07-09T09:30:00.000Z",
                "disponibile": true,
                "partiteAperte": 0
            },
            {
                "inizioSlot": "2023-07-09T09:30:00.000Z",
                "fineSlot": "2023-07-09T11:00:00.000Z",
                "disponibile": false,
                "partiteAperte": 0
            },
            {
                "inizioSlot": "2023-07-09T11:00:00.000Z",
                "fineSlot": "2023-07-09T12:30:00.000Z",
                "disponibile": true,
                "partiteAperte": 1
            },
            {
                "inizioSlot": "2023-07-09T12:30:00.000Z",
                "fineSlot": "2023-07-09T14:00:00.000Z",
                "disponibile": true,
                "partiteAperte": 0
            },
            {
                "inizioSlot": "2023-07-09T14:00:00.000Z",
                "fineSlot": "2023-07-09T15:30:00.000Z",
                "disponibile": true,
                "partiteAperte": 0
            },
            {
                "inizioSlot": "2023-07-09T15:30:00.000Z",
                "fineSlot": "2023-07-09T17:00:00.000Z",
                "disponibile": true,
                "partiteAperte": 0
            }
        ]
    })

    function toggleOpen () {
        isOpen.value = !isOpen.value
    }

    const tipoCampoMessage = computed(()=> {
        return props.tipo === TipoCampo.Esterno ? 'ESTERNI' : 'INTERNI'
    })

    //Funzione per calcolare le fasce orarie dei vari slots
    const slots = computed(() => {
        let inizioString = datiSlotCircolo.value.circolo.orarioApertura;
        let splitInizioString = inizioString.split(".");

        let fineString = datiSlotCircolo.value.circolo.orarioChiusura;
        let splitFineString = fineString.split(".")

        const startDateTime = DateTime.fromJSDate( new Date(splitInizioString[0])); 
        console.log("Start date time: " + startDateTime)
        const interval = Interval.fromDateTimes( startDateTime, DateTime.fromJSDate(new Date(splitFineString[0])));

        return interval.splitBy({ minutes: datiSlotCircolo.value.circolo.durataSlot }).map(
            e => ({ start: e.start?.toJSDate(), end: e.end?.toJSDate() })
        ) as { start: Date, end: Date }[]
    })

    // function loadSlots()
    //
    // onMounted(() => {
    //     loadSlot()
    // })

</script>


<template>

    <button class="text-white bg-bluPadelHub font-circolo p-3 rounded-lg w-full my-3 shadow-lg" v-on:click.prevent="toggleOpen"> {{campoButton}} {{tipoCampoMessage}} </button>

    <div class='w-full flex justify-evenly items-center flex-wrap gap-y-4' :class="{ 'h-0': !isOpen, 'overflow-hidden': !isOpen }" >
        <ItemSlotCircolo

            v-for="slotOrario in slots.length"

            :idCircolo="datiSlotCircolo.circolo._id"

            :dataInizio="slots[slotOrario-1].start"
            :dataFine="slots[slotOrario-1].end"
        
            :colore="(datiSlotCircolo.slots[slotOrario-1].disponibile == false) ? Color.Red : ((datiSlotCircolo.slots[slotOrario-1].partiteAperte > 0) ? Color.Yellow : Color.Green)"
            

            class='w-5 h-7 flex mx-2'
        />
    </div>

</template>

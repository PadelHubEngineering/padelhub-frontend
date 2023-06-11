<script setup lang="ts">
    import {TipoCampo} from "./TipoCampo.types"
    import {computed, ref, reactive, type PropType} from 'vue'
    import ItemSlotCircolo from "@/components/RicercaCircoli/ItemSlotCircolo.vue"
    import { DateTime, Interval } from "luxon"
    import axios, { AxiosError} from "axios"
    import { useAuthUserStore } from "@/stores/authStore";

    const authUserStore = useAuthUserStore()

    const campoButton = "campi";

    enum Color {
        Green = "greenFree",
        Yellow = "yellowReserved",
        Red = "redBusy"
    }
   
    const props = defineProps({
            tipo: { type: String as PropType<TipoCampo>, required:false},
            date: { type: String, required:false},
            idCircolo: { type: String, required:false},
        })

    const isOpen = ref(false)

    interface Slot {
        inizioSlot: string,
        fineSlot: string,
        disponibile: boolean,
        partiteAperte: number
    }

    interface Dati {
        circolo: {
            _id: string,
            orarioApertura: string,
            orarioChiusura: string,
            durataSlot: number
        },
        slots: Slot[]
    }

    let datiSlotCircolo: Dati = reactive({
        circolo: {
            _id: "",
            orarioApertura: "",
            orarioChiusura: "",
            durataSlot: 0
        },
        slots: []
    })

    async function toggleOpen () {
        isOpen.value = !isOpen.value
        if(isOpen){
            let response = null;

            try{
                response = await axios.get(
                    `${import.meta.env.VITE_BACK_URL}/api/v1/giocatore/getSlot?idCircolo=${props.idCircolo}&data=${props.date}&campo=${props.tipo}`,
                    {
                        headers: {
                            'x-access-token': authUserStore.token
                        }
                    }
                )
            } catch(err) {
                let act_err = err as AxiosError
                const data: any = act_err.response?.data;
                console.log(data.message)
            }

            if( response != null ) {
                datiSlotCircolo.circolo = response.data.payload.circolo
                datiSlotCircolo.slots = response.data.payload.slots
            }
        }
    }

    const tipoCampoMessage = computed(()=> {
        return props.tipo === TipoCampo.Esterno ? 'ESTERNI' : 'INTERNI'
    })

    //Funzione per calcolare le fasce orarie dei vari slots
    const slots = computed(() => {
        let inizioString = datiSlotCircolo.circolo.orarioApertura;
        let splitInizioString = inizioString.split(".");

        let fineString = datiSlotCircolo.circolo.orarioChiusura;
        let splitFineString = fineString.split(".")

        const startDateTime = DateTime.fromJSDate( new Date(splitInizioString[0])); 
        console.log("Start date time: " + startDateTime)
        const interval = Interval.fromDateTimes( startDateTime, DateTime.fromJSDate(new Date(splitFineString[0])));

        return interval.splitBy({ minutes: datiSlotCircolo.circolo.durataSlot }).map(
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

<script setup lang="ts">
    import {TipoCampo} from "./TipoCampo.types"
    import {computed, ref} from 'vue'
    import ItemSlotCircolo from "@/components/RicercaCircoli/ItemSlotCircolo.vue"
    import { DateTime, Interval } from "luxon"

    const campoButton = "campi";

    const props = defineProps(['tipo']);

    const isOpen = ref(false)


    const datiSlotCircolo = ref({
        circolo: {
            _id: "647781e64b43cd91be829c27",
            nome: "ilpadelsiamonoi",
            durataSlot: 60,
        },
        orarioAperturaOggi: new Date(2023, 6, 13, 9, 0),
        orarioChiusuraOggi: new Date(2023, 6, 13, 20, 0),

        partite: [
        // {
        //
        // }
        ]
    })

    function toggleOpen () {
        isOpen.value = !isOpen.value
    }

    const tipoCampoMessage = computed(()=> {
        return props.tipo === TipoCampo.Esterno ? 'ESTERNI' : 'INTERNI'
    })
    const slots = computed(() => {
        const startDateTime = DateTime.fromJSDate( datiSlotCircolo.value.orarioAperturaOggi )
        const interval = Interval.fromDateTimes( startDateTime, DateTime.fromJSDate(datiSlotCircolo.value.orarioChiusuraOggi));

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

            v-for="slotOrario in slots"

            :idCircolo="datiSlotCircolo.circolo._id"

            :dataInizio="slotOrario.start"
            :dataFine="slotOrario.end"

            class='w-5 h-7 flex mx-2'
        />
    </div>

</template>


<script setup lang='ts'>

    import { computed, ref } from "vue"
    import { PartitaRetI, stampaCategorie } from "./Partita.types"

    import AccountIcon from "../icons/AccountIcon.vue"

    const props = defineProps({
        partita: { type: PartitaRetI, required: true }
    })


    const partecipanti = computed( () => props.partita.giocatori.length )
    const livello = computed( () => stampaCategorie( props.partita.categoria_min, props.partita.categoria_max) )

</script>

<template>
    <div class='rounded-2xl flex px-3 pb-3 m-2 bg-bluPadelHub flex-col'>
        <div class='flex justify-between'>

            <div class='w-half text-2xl mt-3'>Partita</div>

            <div class='w-half flex pt-3'>
                <div
                    v-for="i in partecipanti"
                    class='rounded-full bg-accentPadelHub text-simpleGrey w-[35px] h-[35px] ml-1'
                >
                    <AccountIcon class='text-simpleGrey w-[35px] h-[35px]'/>
                </div>
            </div>

        </div>
        <div>{{ livello }}</div>
    </div>
</template>

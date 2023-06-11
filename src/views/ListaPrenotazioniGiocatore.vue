
<script setup lang='ts'>
    import type { GiocatoreRetI } from '@/components/partite/Partita.types';
    import type { PrenotazionePartitaRetI } from '@/components/prenotazioniGiocatore/prenotazioniGiocatore.types';
    import { useAuthUserStore } from '@/stores/authStore';
    import axios from 'axios';
    import { computed, onMounted, ref, type Ref } from 'vue';
    import { useRouter } from 'vue-router';

    import MobileHeader from "@/components/MobileHeader.vue"
import { DateTime } from 'luxon';



    const authUserStore = useAuthUserStore();

    const router = useRouter();

// const giocatoreAttuale: Ref<GiocatoreRetI | null> = ref( null )
    const prenotazioniEffettuate: Ref<PrenotazionePartitaRetI[]> = ref([])

    async function loadGiocatore() {

        let response;
        try{
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/prenotazioneGiocatori/`,
                {
                    headers: {
                        'x-access-token': authUserStore.token
                    }
                }
            )
        } catch (error: any) {
            console.log("Impossibile scaricare prenotazioni giocatore " + error.response.data.status)
        }

        console.log(response)

        if ( response === undefined || !response.data.success ){
            return false;
        } else {

            prenotazioniEffettuate.value = response.data.payload;

        }
    }

    onMounted( async () => {

        await loadGiocatore();

    } )

    function stampaData(_data: string) {

        const data = DateTime.fromISO( _data )

        const mese = data.get("month")
        return data.get("day").toString().padStart(2, '0') + "/" + mese.toString().padStart(2, '0') + "/" + data.get("year")
    }

</script>

<template>

    <MobileHeader :ready="true" title='Gioca'>
        <template v-slot:leftSide>
            <img src='/img/indietro_white.png' v-on:click="router.go(-1)">
        </template>
        <template v-slot:rightSide>
            <img src='/img/logoPadelHub.png' v-on:click="router.push({ path: '/' })"/>
        </template>
    </MobileHeader>

    <h1 class='w-full text-3xl text-center mt-5 mb-8'>Prenotazioni effettuate</h1>

    <div
        v-for="p in prenotazioniEffettuate"
        class='border-2 border-bluPadelHub px-3 py-1 text-lg rounded-2xl mb-3 w-4/5 mx-auto grid grid-rows-2 grid-cols-2'
        v-on:click="router.push({ name: 'InfoPartita', params: { idPartita: p.partita?._id } })"
    >
        <span class='text-2xl'>Partita</span>
        <span class='row-span-2 text-right'>{{ p.partita?.giocatori.length }} giocator{{ p.partita?.giocatori.length && p.partita?.giocatori.length > 1 ? 'i':'e' }}</span>
        <span>{{ stampaData( p.dataPrenotazione )}}</span>

    </div>

</template>

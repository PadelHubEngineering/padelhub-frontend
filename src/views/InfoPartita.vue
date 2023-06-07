
<script setup lang='ts'>
    import { useRoute, useRouter } from 'vue-router';
    import PartitaHeader from "../components/partite/PartitaHeader.vue"
    import PartitaHeaderInfo from "../components/partite/PartitaHeaderInfo.vue"
    import VisualizzatoreGiocatori from "@/components/partite/VisualizzatoreGiocatori.vue"
    import MobileHeader from "@/components/MobileHeader.vue"
    import axios from 'axios';
    import { stampaCategorie, type PartitaRetI } from '@/components/partite/Partita.types';
    import { computed, onMounted, ref, type Ref } from 'vue';
    import { DateTime } from "luxon"
    import { useAuthUserStore } from '@/stores/authStore';


    const route = useRoute()
    const router = useRouter()
    const authUserStore = useAuthUserStore();

    const { idPartita } = route.params

    const bottomButtonClass = 'p-3 ml-auto mr-3 rounded-2xl text-2xl text-white flex flex-col justify-center'.split(" ")


    const partita: Ref<PartitaRetI | undefined> = ref(undefined)
    const isIscritto = ref(false)

    const needConfirmation = ref(true)

    async function loadPartita() {
        if( idPartita instanceof Array || idPartita === "" ) return

        console.log(`tento scaricamento dati partita: ${idPartita}`)

        let response;

        try{
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/partite/${idPartita}`,
                {
                    headers: {
                        'x-access-token': authUserStore.token
                    }
                }
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

            console.log("Partita scaricata")
            console.log(partita.value)

        }
    }

    onMounted( async () => {

        await loadPartita()

    } )


    const nomeCircolo = computed( () => {
        return partita.value?.circolo?.nome || ""
    } )

    const oraFinePartita = computed( () => {
        return DateTime.fromISO(partita.value?.orario).plus({ minutes: partita.value?.circolo?.durataSlot }).toJSDate()
    } )

    const oraInizioPartita = computed( () => {

        if( !partita.value ) return undefined

        return new Date(partita.value.orario)

    })

    const getCategoriaString = computed( () => {
        if( partita.value?.categoria_min === undefined || partita.value.categoria_max === undefined )
            return ""
        else
            return stampaCategorie(partita.value?.categoria_min, partita.value?.categoria_max )

    })

    const usersImgs = computed( () => {

        if( !partita.value ) return []

        return partita.value.giocatori.map( e => e.foto )
    })

    const isPartecipante = computed( () => {
        if( !partita.value ) return undefined

        return partita.value.giocatori.filter(g => g.email === authUserStore.email)
    } )

    function pay() {
        console.log("Paghiamo")
    }

    function annullaPrenotazione() {
        if ( needConfirmation.value )
            needConfirmation.value = false
        else
            console.log("Annulliamo lol")
    }

</script>

<template>

    <MobileHeader :ready="!!partita" :title='isPartecipante ? "Modifica partita": "Partecipa"'>
        <template v-slot:leftSide>
            <img src='/img/indietro_white.png' v-on:click="router.go(-1)">
        </template>
    </MobileHeader>

    <PartitaHeader :iscritto="isIscritto" :nomeCircolo="nomeCircolo"/>
    <PartitaHeaderInfo :dataOraInizioPartita="oraInizioPartita" :oraFinePartita="oraFinePartita" :tipoCampo="partita?.tipoCampo"/>
    <div class='mx-2 my-3 text-lg'>Categoria: {{ getCategoriaString }}</div>

    <VisualizzatoreGiocatori :usersImgs="usersImgs"/>

    <div v-if='isPartecipante' class='w-full absolute bottom-2 flex justify-between' >


        <div v-if='isPartecipante && !needConfirmation' class='text-lg px-4'>Sicuro di voler annullare la prenotazione?</div>

        <div v-else class='text-lg px-4'></div>


        <button v-if='isPartecipante'
            :class="[ { 'bg-bluPadelHub': needConfirmation, 'bg-redBusy': !needConfirmation}, bottomButtonClass ]"
            v-on:click.prevent="annullaPrenotazione"
        >
            <span>Rinuncia</span>
        </button>

        <button v-else
            :class="[ { 'bg-bluPadelHub': needConfirmation, 'bg-redBusy': !needConfirmation}, bottomButtonClass ]"
            v-on:click.prevent="pay"
            class='p-3 ml-auto mr-3 rounded-2xl text-2xl text-white flex flex-col justify-center'
        >
            <span>Partecipa</span>
            <span class='text-right w-full pr-1'>{{ partita?.circolo?.costoPrenotazione }} €</span>
        </button>
    </div>
</template>

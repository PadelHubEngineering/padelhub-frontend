
<script setup lang='ts'>
    import { CircoloRetI, stampaCategorie, type GiocatoreRetI } from '@/components/partite/Partita.types';
    import { useAuthUserStore } from '@/stores/authStore';
    import axios from 'axios';
    import { DateTime } from 'luxon';
    import { computed, onMounted, reactive, ref, type Ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import MobileHeader from "@/components/MobileHeader.vue"
    import PartitaHeader from "@/components/partite/PartitaHeader.vue"
    import PartitaHeaderInfo from "@/components/partite/PartitaHeaderInfo.vue"



    const route = useRoute();
    const router = useRouter();
    const authUserStore = useAuthUserStore()


    const classeLabelCategoria = 'mt-4 mx-4 text-2xl block'
    const classeSliderCategoria = 'w-4/5 mx-auto block my-7 block'


    const dataOra: Ref<DateTime | null> = ref(null)
    const tipoCampo: Ref<string | null> = ref(null)
    const idCircolo: Ref<string | null> = ref(null)
    const nomeCircolo: Ref<string | null> = ref(null)

    const giocatoreAttuale: Ref<GiocatoreRetI | null> = ref(null);
    const circolo: CircoloRetI | null = reactive({
        _id: "",
        nome: "",
        durataSlot: 0,
        costoPrenotazione: 0,
        email: "",
        costoPrenotazioneAffiliato: 0
    })
    const isGiocatoreAffiliato: Ref< boolean > = ref( false )

    const categoria_min = ref(1)
    const categoria_max = ref(5)

    const isErrored = ref( false )
    const errorMessage = ref("")
    const needsConfirmation = ref( true )

    const getCategoriaString = computed( () => {
        console.log( stampaCategorie(categoria_min.value, categoria_max.value ) )
        return stampaCategorie(categoria_min.value, categoria_max.value )
    })

    onMounted( async () => {

        const _dataOra = route.query.dataOra;
        const _tipoCampo = route.query.tipoCampo;
        const _idCircolo = route.query.idCircolo;
        const _nomeCircolo = route.query.nomeCircolo;


        if(
            typeof _dataOra !== "string" ||
            typeof _tipoCampo !== "string" ||
            typeof _idCircolo !== "string" ||
            typeof _nomeCircolo !== "string"
        ) {
            return {}
        } else {
            dataOra.value = DateTime.fromISO( _dataOra )
            tipoCampo.value = _tipoCampo
            idCircolo.value = _idCircolo,
            nomeCircolo.value = _nomeCircolo
        }

        let response;
        try{
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/circolo/${idCircolo.value}`,
                {
                    headers: {
                        'x-access-token': authUserStore.token
                    }
                }
            )
        } catch (error: any) {
            console.log("Impossibile scaricare dati circolo " + error.response.data.status)
        }

        console.log(response)

        if ( response === undefined || !response.data.success ){
            return false;
        } else {

            const { circolo: circoloRet, isAffiliato } = response.data.payload;

            circolo._id = circoloRet._id
            circolo.nome =  circoloRet.nome
            circolo.durataSlot = circoloRet.durataSlot,
            circolo.costoPrenotazione = circoloRet.costoPrenotazione,
            circolo.email =  circoloRet.email,
            circolo.costoPrenotazioneAffiliato = circoloRet.costoPrenotazioneAffiliato

            isGiocatoreAffiliato.value = isAffiliato

        }


        try{
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/giocatore/datiGiocatore`,
                {
                    headers: {
                        'x-access-token': authUserStore.token
                    }
                }
            )
        } catch (error: any) {
            console.log("Impossibile scaricare dati giocatore attuale " + error.response.data.status)
        }

        console.log(response)

        if ( response === undefined || !response.data.success ){
            return false;
        } else {

            const { giocatore } = response.data.payload;

            giocatoreAttuale.value = giocatore

        }

    })

    async function crea_partita() {

        if( !circolo || !dataOra.value || !tipoCampo.value || !giocatoreAttuale.value ) {
            console.log("Dati mancanti per creare la prenotazione partita")
            return;
        }

        // Per qualche motivo i range possono ritornare string o int
        // in modo assolutamente casuale
        const c_min = parseInt( categoria_min.value.toString() )
        const c_max = parseInt( categoria_max.value.toString() )

        const c_gioc = giocatoreAttuale.value?.categoria;

        if(  c_gioc < c_min || c_gioc > c_max ) {
            errorMessage.value = "Non puoi creare partite alle quali non puoi partecipare"
            isErrored.value = true

            needsConfirmation.value = true
            return;
        }

        if( needsConfirmation.value ) {
            needsConfirmation.value = false;
            isErrored.value = false
            return;
        }

        let response;
        try{
            response = await axios.post(
                `${import.meta.env.VITE_BACK_URL}/api/v1/partite/`,
                {
                    "circolo" : circolo._id,
                    "categoria_min": c_min,
                    "categoria_max" : c_max,

                    "orario" : dataOra.value?.toJSON(),
                    "tipoCampo": tipoCampo.value
                },
                {
                    headers: {
                        'x-access-token': authUserStore.token
                    }
                }
            )
        } catch (error: any) {
            console.log("Impossibile creare la partita " + error.response.data.status)
            isErrored.value = true;
        }

        console.log(response)

        if ( response === undefined || !response.data.success ){
            isErrored.value = true;
            return false;
        } else {

            isErrored.value = false;

            const { payload } = response.data;

            window.location.href = payload.url
        }


    }

    const oraFine = computed( () => {
        if( !dataOra.value || !circolo.durataSlot )
            return undefined;
        else
            return dataOra.value?.plus({ minutes: circolo.durataSlot }).toJSDate()
    } )

    const pNomeCircolo = computed( () => {
        if( !circolo.nome )
            return nomeCircolo.value || "Circolo"
        else
            return circolo.nome
    } )

    const calcolaCosto = computed( () => {
        if ( circolo.costoPrenotazione === 0 )
            return ""
        else
            return ( isGiocatoreAffiliato ? circolo.costoPrenotazioneAffiliato.toString() : circolo.costoPrenotazione.toString() )
    } )

</script>


<template>

    <MobileHeader :ready="true" :title='"Nuova partita"'>
        <template v-slot:leftSide>
            <img src='/img/indietro_white.png' class='cursor-pointer' v-on:click="router.go(-1)">
        </template>
        <template v-slot:rightSide>
            <img src='/img/logoPadelHub.png' class='cursor-pointer' v-on:click="router.push({ path: '/' })"/>
        </template>
    </MobileHeader>

    <PartitaHeader :iscritto="isGiocatoreAffiliato" :nomeCircolo="pNomeCircolo"/>
    <PartitaHeaderInfo :dataOraInizioPartita="dataOra?.toJSDate()" :oraFinePartita="oraFine" :tipoCampo="tipoCampo"/>


    <label :class="classeLabelCategoria">Categoria minima</label>
    <input
        :class=classeSliderCategoria
        v-model="categoria_min"
        type="range"

        max='5' min='1' step='1'
    />
    <label :class="classeLabelCategoria">Categoria massima</label>
    <input
        :class=classeSliderCategoria
        v-model="categoria_max"
        type="range" max='5' min='1' step='1'
    />

    <div class='my-3 text-2xl w-full block text-center'>{{ getCategoriaString }}</div>

    <div class='absolute left-1/2 transform -translate-x-1/2 bottom-4 w-4/5'>

        <span v-if="isErrored" class="text-center text-redBusy block text-lg mb-2 leading-6">{{ errorMessage }}</span>

        <button
            :class="[ { 'bg-bluPadelHub': needsConfirmation, 'bg-redBusy': !needsConfirmation}, 'rounded-2xl px-4 py-3 mx-auto block text-2xl text-white' ]"
            v-on:click.prevent="crea_partita"
        >
            <span>Crea partita e paga - {{ calcolaCosto }} €</span>
        </button>

    </div>

</template>

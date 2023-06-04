<script setup lang="ts">
    import ItemSlot, { Color } from "@/components/GestioneSlot/ItemSlot.vue";
    import CircoloMenuComponent from "@/components/CircoloMenuItems/CircoloMenuComponent.vue"
    import SlotGrid from "@/components/GestioneSlot/SlotGrid.vue";
    import DataPicker from "@/components/DataPicker.vue";
    import DataPickerVue from "@/components/DataPicker.vue";
    import axios, { type AxiosResponse } from "axios";
    import { onMounted, ref, type Ref } from "vue";
    import { useStore } from "vuex";

    const store = useStore()

    type Mappa = {
        orari: string[],
        campiInterni: Campo[],
        campiEsterni: Campo[]
    }

    export interface Campo {
        idCampo: number,
        prenotazioni: Map<string,Object>
    }


    let date = ref(new Date());
    let mappa: Ref<Mappa> = ref({
        orari: [""],
        campiInterni: [] as Campo[],
        campiEsterni: [] as Campo[]
    })

    async function sendRequestToBack(dataGiorno: Date){ //funzione per mandare la richiesta al back

        mappa.value = {
            orari: [""],
            campiInterni: [] as Campo[],
            campiEsterni: [] as Campo[]
        }


        var mese = dataGiorno.getMonth() + 1
        var dataToPass: string = dataGiorno.getFullYear() + "-" + mese.toString().padStart(2, '0') + "-" + dataGiorno.getDate().toString().padStart(2, '0')


        if (!axios) return

        let response: AxiosResponse | undefined;

        try{
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/circolo/prenotazioniSlot/${dataToPass}`, //Impostare l'URL a cui collagarsi
                {
                    headers: {
                        'x-access-token': store.state.auth.token
                    }
                }
            )
        } catch( err: any ) {
            const { message } = err.response.data;
            console.log(message)
        }

    
        if ( response ) {
            findFasceOrarie(response.data)
            createMap(response.data)
        }
    }

    async function createMap(risposta:any){

        //Per ogni campo interno
        risposta.payload.campiInterni.forEach((item:any)=> { createAddCampo(item, 'Interni')})

        //Per ogni campo Esterno
        risposta.payload.campiEsterni.forEach((item:any)=> { createAddCampo(item, 'Esterni')})

    }

    async function createAddCampo(item: any, tipo: string){

            //Creo l'oggetto campo
            let o: Campo = {
                idCampo: item.idCampo,
                prenotazioni: new Map<string,Object>()
            }

            item.prenotazioni.forEach((prenotazione:any) => {

                var colore: Color
                var start = new Date(prenotazione.inizioSlot)

                //Per ogni prenotazione individuo il colore
                if(prenotazione.tipoUtente == 'Giocatore') colore = Color.Red
                else if(prenotazione.tipoUtente == 'Circolo') colore = Color.Yellow
                else colore = Color.Green

                //Creo la chiave
                var key: string = start.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

                o.prenotazioni.set(key,  {
                    color: colore,
                    id_partita: prenotazione.partita
                })
            })

            if(tipo === 'Interni')
                mappa.value.campiInterni.push(o)
            else
                mappa.value.campiEsterni.push(o)
    }

    function findFasceOrarie(risposta:any){ //funzione per popolare l'array contentente l'inizio di tutte le fasce orarie e l'orario di chiusura del circolo come ultimo elemento

        // per avere i millisecondi come number

        var aperturaTime = new Date(risposta.payload.orarioApertura)
        var chiusuraTime = new Date(risposta.payload.orarioChiusura)


        var current = aperturaTime.valueOf() //Millisecondi
        var final = chiusuraTime.valueOf() //Millisecondi data chiusura


        // converto la durata dello slot in millesecondi
        var millisecSlot = risposta.payload.durataSlot * 60000

        var dateToConvert = new Date(current)
        mappa.value.orari[0] = dateToConvert.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
        current += millisecSlot

        while(current <= final){
            dateToConvert = new Date(current)
            mappa.value.orari.push(dateToConvert.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
            current += millisecSlot
        }

    }

    onMounted(async () => {
        await sendRequestToBack( new Date() )
    })

</script>


<template>
    <div class="flex h-screen w-screen">
        <CircoloMenuComponent  class='w-1/5 min-w-[300px]'/>

        <div class="w-4/5 max-w-4/5 ml-5 mt-5 overflow-x-auto">
            <DataPickerVue v-model="date" @update="sendRequestToBack"></DataPickerVue>
            <br><br>
            <SlotGrid 
                :orari="mappa.orari"
                :campiInterni="mappa.campiInterni"
                :campiEsterni="mappa.campiEsterni"
                :data="date"
            ></SlotGrid>
        </div>
    </div>
</template>

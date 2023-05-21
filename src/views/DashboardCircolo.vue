<script setup lang="ts">
    import ItemSlot, { Color } from "@/components/GestioneSlot/ItemSlot.vue";
    import CircoloMenuComponent from "../components/CircoloMenuItems/CircoloMenuComponent.vue"
    import SlotGrid from "@/components/GestioneSlot/SlotGrid.vue";
    import DataPicker from "@/components/DataPicker.vue";
    import DataPickerVue from "@/components/DataPicker.vue";
import axios from "axios";


</script>


<template>
    <div class="flex h-screen w-screen">
        <CircoloMenuComponent  class='w-1/5 min-w-[300px]'/>

        <div class="w-4/5 max-w-4/5 ml-5 mt-5 overflow-x-auto">
            <DataPickerVue v-model="date" @update="sendRequestToBack"></DataPickerVue>
            <br><br>
            <SlotGrid 
                :orari="this.mappa.orari"
                :campiInterni="this.mappa.campiInterni"
                :campiEsterni="this.mappa.campiEsterni"
                :data="this.date"
            ></SlotGrid>
        </div>
    </div>
</template>

<script lang="ts">

    export interface Campo {
        idCampo: number,
        prenotazioni: Map<string,Object> 
    }


    export default {
    name: "DashboardCircolo",
    data() {
        return {
            date: new Date(),
            mappa: {
                orari: [""],
                campiInterni: [] as Campo[],
                campiEsterni: [] as Campo[]
            }

        };
    },
    methods: {

        async sendRequestToBack(dataGiorno: Date){ //funzione per mandare la richiesta al back

            this.mappa = {
                orari: [""],
                campiInterni: [] as Campo[],
                campiEsterni: [] as Campo[]
            }


            var mese = dataGiorno.getMonth() + 1 
            var dataToPass: string = dataGiorno.getFullYear() + "-" + mese.toString().padStart(2, '0') + "-" + dataGiorno.getDate().toString().padStart(2, '0') 
            
    
            if (!axios) return

            await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/circolo/prenotazioniSlot/${dataToPass}`, //Impostare l'URL a cui collagarsi
                 {
                    headers: {
                        'x-access-token': this.$store.state.auth.token
                    }
                 }
            ).then(response => {

                console.log(response)
                this.findFasceOrarie(response.data)
                this.createMap(response.data)
      

            }).catch( err => {
                const { message } = err.response.data;
                console.log(message)
            })
            
        },

        createMap(risposta:any){

            //Per ogni campo interno
            risposta.payload.campiInterni.forEach((item:any)=> { this.createAddCampo(item, 'Interni')})

            //Per ogni campo Esterno 
            risposta.payload.campiEsterni.forEach((item:any)=> { this.createAddCampo(item, 'Esterni')}) 
            
        },

        createAddCampo(item: any, tipo: string){

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
                    this?.mappa.campiInterni.push(o)
                else
                    this?.mappa.campiEsterni.push(o)
        },

        findFasceOrarie(risposta:any){ //funzione per popolare l'array contentente l'inizio di tutte le fasce orarie e l'orario di chiusura del circolo come ultimo elemento

            // per avere i millisecondi come number
            
            var aperturaTime = new Date(risposta.payload.orarioApertura)
            var chiusuraTime = new Date(risposta.payload.orarioChiusura)


            var current = aperturaTime.valueOf() //Millisecondi
            var final = chiusuraTime.valueOf() //Millisecondi data chiusura


            // converto la durata dello slot in millesecondi
            var millisecSlot = risposta.payload.durataSlot * 60000

            var dateToConvert = new Date(current)
            this.mappa.orari[0] = dateToConvert.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            current += millisecSlot

            while(current <= final){
                dateToConvert = new Date(current)
                this?.mappa.orari.push(dateToConvert.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
                current += millisecSlot
            }

        }


    },

    async beforeMount(){ //Da fare prima di caricare la pagina
          await this.sendRequestToBack(new Date())
    //    this.findFasceOrarie(),
    //    this.createMap()
    },

    component: [
        CircoloMenuComponent,
        SlotGrid,
        DataPickerVue
    ]
    
}
</script>

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
                :orari="this.map.orari"
                :campiInterni="this.map.campiInterni"
                :campiEsterni="this.map.campiEsterni"
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
            risposta: {
                orarioApertura: "1899-12-31T07:00:00.000Z",
                orarioChiusura: "1899-12-31T18:00:00.000Z",
                durataSlot: 60,
                campiInterni: [
                    {
                        idCampo: 1,
                        prenotazioni: [
                        {
                                id: "asasa",
                                inizioSlot: "2023-06-18T11:00:00.000Z",
                                fineSlot: "2023-06-18T12:00:00.000Z",
                                tipoUtente: "Circolo"
                            }
                        ]
                    },
                    {
                        idCampo: 2,
                        prenotazioni: [
                        {
                                id: "asasa",
                                inizioSlot: "2023-06-18T12:00:00.000Z",
                                fineSlot: "2023-06-18T13:00:00.000Z",
                                tipoUtente: "Giocatore"
                            }
                        ]
                    }
                ],
                campiEsterni: [
                    {
                        idCampo: 3,
                        prenotazioni: [
                            {
                                id: "asasa",
                                inizioSlot: "2023-06-18T12:00:00.000Z",
                                fineSlot: "2023-06-18T13:00:00.000Z",
                                tipoUtente: "Circolo"
                            }
                        ]
                    },
                    {
                        idCampo: 4,
                        prenotazioni: []
                    }

                ]
            },

            map: {
                orari: [""],
                campiInterni: [] as Campo[],
                campiEsterni: [] as Campo[]
            }

        };
    },
    methods: {

        sendRequestToBack(dataGiorno: Date){ //funzione per mandare la richiesta al back

            console.log(dataGiorno)

            // console.log(this.$store.state.auth.token)
    
            // if (!axios) return

            // axios.get(
            //     `${import.meta.env.VITE_BACK_URL}/api/v1/prenotazioniSlot`, //Impostare l'URL a cui collagarsi
            //      {
            //         headers: {
            //             'data-attuale': this.date.toString(),
            //             'x-access-token': this.$store.state.auth.token
            //         }
            //      }
            // ).then(response => {

            //     console.log(response)
            //    // this.risposta = response
      

            // }).catch( err => {
            //     const { message } = err.response.data;
            //     console.log(message)
            // })
            
        },

        createMap(){

            //Per ogni campo interno
            this.risposta.campiInterni.forEach((item)=> { this.createAddCampo(item, 'Interni')})

            //Per ogni campo Esterno 
            this.risposta.campiEsterni.forEach((item)=> { this.createAddCampo(item, 'Esterni')}) 
            
            console.log(this.map)
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
                
                    o.prenotazioni.set(key,  {color: colore})
                })
                
                if(tipo === 'Interni')
                    this.map.campiInterni.push(o)  
                else
                    this.map.campiEsterni.push(o)
        },

        findFasceOrarie(){ //funzione per popolare l'array contentente l'inizio di tutte le fasce orarie e l'orario di chiusura del circolo come ultimo elemento

            // per avere i millisecondi come number
            
            var aperturaTime = new Date(this.risposta.orarioApertura)
            var chiusuraTime = new Date(this.risposta.orarioChiusura)

            var current = aperturaTime.valueOf() //Millisecondi
            var final = chiusuraTime.valueOf() //Millisecondi data chiusura

            // converto la durata dello slot in millesecondi
            var millisecSlot = this.risposta.durataSlot * 60000

            var dateToConvert = new Date(current)
            this.map.orari[0] = dateToConvert.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            current += millisecSlot

            while(current <= final){
                dateToConvert = new Date(current)
                this.map.orari.push(dateToConvert.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
                current += millisecSlot
            }

        }


    },

    beforeMount(){ //Da fare prima di caricare la pagina
       // this.sendRequestToBack()
       this.findFasceOrarie(),
       this.createMap()
    },

    component: [
        CircoloMenuComponent,
        SlotGrid,
        DataPickerVue
    ]
    
}
</script>

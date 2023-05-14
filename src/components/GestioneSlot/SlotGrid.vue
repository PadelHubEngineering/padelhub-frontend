<template>
    
    <p>Campi INTERNI</p>
    <table class="table-fixed border-spacing-2">
        <thead class="sticky top-0">
            <tr> 
                <!-- Metto giù l'header delle tabelle con le varie fascie orarie -->
                <th class=""></th>
                <th v-for="i in (this.orari.length-1)" > {{ this.orari[i-1] }} - {{ this.orari[i] }}   </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="campo in this.campiInterni.length">
                <th scope="row">{{ this.campiInterni[campo-1].id }}</th>   
                <!-- per ogni fascia oraria guardo se esiste una prenotazione nello slot -->
                <td v-for="i in (this.orari.length-1)"><ItemSlot :color=findColor(campo-1,i-1)></ItemSlot></td>
            </tr>
        </tbody>
    </table>
    

</template>

<script lang='ts'>
import ItemSlot, { Color } from './ItemSlot.vue';


    export default {
    name: "SlotColumn",
    data() {
        return {
            oraApertura: new Date(1683961200000),
            oraChiusura: new Date(1683990000000),
            durataSlot: "1:00",
            orari: [''],
            campiInterni: [

                {
                    id: "CAMPO 1",
                    prenotazioni: [
                        {
                            nSlot: 7, 
                            color: Color.Red
                        }
                    ]
                },

                {
                    id: "CAMPO 2",
                    prenotazioni: [
                        {
                            nSlot: 3, 
                            color: Color.Red
                        },
                        {
                            nSlot: 4, 
                            color: Color.Yellow
                        },
                        {
                            nSlot: 6, 
                            color: Color.Red
                        },
                        {
                            nSlot: 7, 
                            color: Color.Yellow
                        }
                    ]
                },

                {
                    id: "CAMPO 3",
                    prenotazioni: [
                        {
                            nSlot: 6, 
                            color: Color.Red
                        }
                    ]
                }


            ],
            campiEsterni: [
                {
                    id: "CAMPO 5",
                    color: Color.Green
                },
                {
                    id: "CAMPO 6",
                    color: Color.Red
                },
                {
                    id: "CAMPO 7",
                    color: Color.Yellow
                },
                {
                    id: "CAMPO 8",
                    color: Color.Green
                }
            ],
            counter: 0
        };
    },
    components: { ItemSlot },
    methods: {
        findFasceOrarie(){

            // per avere i millisecondi come number
            var current = this.oraApertura.valueOf()
            var final = this.oraChiusura.valueOf()

            // converto la durata dello slot in millesecondi
            var s = this.durataSlot.split(":")
            var millisecSlot = (+s[0])*60*60000 + (+s[1])*60000

            var date = new Date(current)
            this.orari[0] = date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
            current += millisecSlot

            while(current <= final){
                date = new Date(current)
                this.orari.push(date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
                current += millisecSlot
            }

        }

    }, 
    mounted(){
        this.findFasceOrarie()
    },
    computed: {
        findColor(){

            return(campo:number, s:number) => {
        
                //Se è una nuova riga allora il counter torna a zero
                if(s === 0) this.counter = 0

                if(this.campiInterni[campo].prenotazioni[this.counter].nSlot === s+1){
                    let position = this.counter
                    if(this.counter < (this.campiInterni[campo].prenotazioni.length-1)) 
                        this.counter++
                    return this.campiInterni[campo].prenotazioni[position].color
                } else {
                    return Color.Green
                }
            }
        }
    }
}



</script>

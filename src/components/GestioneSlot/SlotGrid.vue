<script lang='ts'>
import ReservationModalVue from '../riservaSlotCircolo/ReservationModal.vue';
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
                    id: "CAMPO 4",
                    prenotazioni: [
                        {
                            nSlot: 2, 
                            color: Color.Red
                        },
                        {
                            nSlot: 3, 
                            color: Color.Yellow
                        }
                    ]
                },

                {
                    id: "CAMPO 5",
                    prenotazioni: [
                        {
                            nSlot: 6, 
                            color: Color.Red
                        }
            
                    ]
                }
            ],
            counter: 0
        };
    },
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
        },
        showModal(value:number){
            this.$refs.modale.openModal(this.orari[value], this.orari[value+1])
            //console.log(this.orari[value] + " - " + this.orari[value+1])
        }

    }, 
    mounted(){
        this.findFasceOrarie()
    },
    computed: {
        findColorInterni(){

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
        },
        findColorEsterni(){

            return(campo:number, s:number) => {

                //Se è una nuova riga allora il counter torna a zero
                if(s === 0) this.counter = 0

                if(this.campiEsterni[campo].prenotazioni[this.counter].nSlot === s+1){
                    let position = this.counter
                    if(this.counter < (this.campiEsterni[campo].prenotazioni.length-1)) 
                        this.counter++
                    return this.campiEsterni[campo].prenotazioni[position].color
                } else {
                    return Color.Green
                }
            }
            }
    },
    components: { ItemSlot, ReservationModalVue }, 
}



</script>

<template>
    
    <p class="text-bluPadelHub font-bold font-circolo drop-shadow text-2xl text-center">CAMPI INTERNI</p><br>
    <table class="table-fixed transform-gpu">
        <thead class="sticky top-0">
            <tr> 
                <!-- Metto giù l'header delle tabelle con le varie fascie orarie -->
                <th class=""></th>
                <th v-for="i in (this.orari.length-1)" class="text-bluPadelHub text-lg font-circolo drop-shadow font-thin"> {{ this.orari[i-1] }} - {{ this.orari[i] }}   </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="campo in this.campiInterni.length">
                <th scope="row" class="text-bluPadelHub text-lg font-circolo drop-shadow">{{ this.campiInterni[campo-1].id }}</th>   
                <!-- per ogni fascia oraria guardo se esiste una prenotazione nello slot -->
                <td v-for="i in (this.orari.length-1)" align="center">
                    <ItemSlot v-on:click.native="showModal(i-1)"
                    :color=findColorInterni(campo-1,i-1)
                    :inizio=this.orari[i-1]
                    :fine="this.orari[i]"
                    ></ItemSlot></td>
            </tr>
        </tbody>
    </table>

    <br><br><br>

    <!-- <p class="text-bluPadelHub font-bold font-circolo drop-shadow text-2xl text-center">CAMPI ESTERNI</p><br>
    <table class="table-fixed border-spacing-2">
        <thead class="sticky top-0">
            <tr> 
                <th class=""></th>
                <th v-for="i in (this.orari.length-1)" class="text-bluPadelHub text-lg font-circolo drop-shadow font-thin"> {{ this.orari[i-1] }} - {{ this.orari[i] }}   </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="campo in this.campiEsterni.length">
                <th scope="row" class="text-bluPadelHub text-lg font-circolo drop-shadow">{{ this.campiEsterni[campo-1].id }}</th>   
                <td v-for="i in (this.orari.length-1)"><ItemSlot v-on:click.native="showModal" :color=findColorEsterni(campo-1,i-1)></ItemSlot></td>
            </tr>
        </tbody>
    </table> -->
    
    <ReservationModalVue ref="modale"></ReservationModalVue>

</template>




<style>

table {
  border-collapse: separate;
  border-spacing: 30px 10px;
  width: 1300px;
}


</style>
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
            <tr v-for="item in this.campiInterni">
                <th scope="row">{{ item.id  }}</th>   
                <td><ItemSlot :color=item.color></ItemSlot></td>
                <td><ItemSlot :color=item.color></ItemSlot></td>
                <td><ItemSlot :color=item.color></ItemSlot></td>
                <td><ItemSlot :color=item.color></ItemSlot></td> 
                <!-- <td>{{ item }}</td> -->
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
            oraChiusura: new Date(1684009800000),
            durataSlot: "1:30",
            orari: [''],
            nSlot: 0,
            campiInterni: [
                {
                    id: "CAMPO 1",
                    color: Color.Green
                },
                {
                    id: "CAMPO 2",
                    color: Color.Red
                },
                {
                    id: "CAMPO 3",
                    color: Color.Yellow
                },
                {
                    id: "CAMPO 4",
                    color: Color.Green
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
            ]
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
            this.nSlot++

            while(current <= final){
                date = new Date(current)
                this.orari.push(date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}))
                current += millisecSlot
                this.nSlot++
            }
        }
    }, 
    mounted(){
        this.findFasceOrarie()
    }
}



</script>

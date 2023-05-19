<script lang='ts'>
import ReservationModalVue from '../riservaSlotCircolo/ReservationModal.vue';
import ItemSlot, { Color } from './ItemSlot.vue';


    export default {
    name: "SlotColumn",
    data() {
        return {
        }
    },
    methods: {

        showModal(value:number, color: Color){
            this.$refs.modale.openModal(this.orari[value], this.orari[value+1], color)
        }

    },
    computed: {
        findColorInterni(){

            return (c:number, s:number) => {

                var key: string = this.orari[s]
                
                if ( !( c in this.campiInterni ) ) return

                if(this.campiInterni[c].prenotazioni.get(key)){ //Se esiste una prenotazione per quell'orario 
                    return this.campiInterni[c].prenotazioni.get(key).color
                } else return Color.Green
        
            }
        },
        findColorEsterni(){

            return (c:number, s:number) => {

                var key: string = this.orari[s]

                if ( !( c in this.campiEsterni ) ) return

                if(this.campiEsterni[c].prenotazioni.get(key)){ //Se esiste una prenotazione per quell'orario 
                    return this.campiEsterni[c].prenotazioni.get(key).color
                } else return Color.Green

}
}
    },
    components: { ItemSlot, ReservationModalVue },
    props: ['orari', 'campiInterni', 'campiEsterni'] 
}



</script>

<template>
    
    <p class="text-bluPadelHub font-bold font-circolo drop-shadow text-2xl text-center pt-5">CAMPI INTERNI</p><br>
    <div id="table-scroll" class="table-scroll table-wrap">
        <table class="table-fixed transform-gpu">
            <thead class="sticky top-0">
                <tr> 
                    <!-- Metto giù l'header delle tabelle con le varie fascie orarie -->
                    <th class=""></th>
                    <th v-for="i in (this.orari.length-1)" class="bg-white text-bluPadelHub text-lg font-circolo font-thin"> {{ this.orari[i-1] }} - {{ this.orari[i] }}   </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="campo in this.campiInterni.length">
                    <th scope="row" class="text-bluPadelHub text-lg font-circolo bg-white sticky left-0">{{ this.campiInterni[campo-1].idCampo }}</th>   
                    <!-- per ogni fascia oraria guardo se esiste una prenotazione nello slot -->
                    <td v-for="i in (this.orari.length-1)" align="center">
                        <ItemSlot
                            v-on:click.native="showModal(i-1, findColorInterni(campo-1,i-1))"
                            :color=findColorInterni(campo-1,i-1)
                            :inizio=this.orari[i-1]
                            :fine="this.orari[i]"
                        ></ItemSlot></td>
                </tr>
            </tbody>
        </table>
    </div>

    <br><br><br>

    <p class="text-bluPadelHub font-bold font-circolo drop-shadow text-2xl text-center">CAMPI ESTERNI</p><br>
    <div id="table-scroll" class="table-scroll table-wrap">
        <table class="table-fixed transform-gpu">
            <thead class="sticky top-0">
                <tr> 
                    <!-- Metto giù l'header delle tabelle con le varie fascie orarie -->
                    <th class=""></th>
                    <th v-for="i in (this.orari.length-1)" class="text-bluPadelHub bg-white text-lg font-circolo font-thin"> {{ this.orari[i-1] }} - {{ this.orari[i] }}   </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="campo in this.campiEsterni.length">
                    <th scope="row" class="text-bluPadelHub text-lg font-circolo bg-white">{{ this.campiEsterni[campo-1].idCampo }}</th>   
                    <!-- per ogni fascia oraria guardo se esiste una prenotazione nello slot -->
                    <td v-for="i in (this.orari.length-1)" align="center">
                        <ItemSlot
                            v-on:click.native="showModal(i-1, findColorEsterni(campo-1,i-1))"
                            :color=findColorEsterni(campo-1,i-1)
                            :inizio=this.orari[i-1]
                            :fine="this.orari[i]"
                        ></ItemSlot></td>
                </tr>
            </tbody>
        </table>
    </div>

    

    <ReservationModalVue ref="modale"></ReservationModalVue>

</template>




<style>

table {
  border-collapse: separate; 
  border-spacing: 10px 5px;
  width: auto;
  min-width: 1900px;
}

.table-scroll {
	position:relative;
	max-width:auto;
    max-height: 350px;
	/* margin:auto; */
	overflow:hidden;
	border:0px;
    
}

.table-wrap {
	width:100%;
	overflow:auto;
}


/* width */
::-webkit-scrollbar {
  width: 2px;
}

/* Track */
::-webkit-scrollbar-track {
  background-color: transparent;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  border-radius: 20px;
  border: 10px solid transparent;
  background-color: rgba(0,0,0,0.2);
  background-clip: content-box;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  border-radius: 20px;
  border: 8px solid transparent;
  background-color: rgba(0, 0, 0, 0.318);
  background-clip: content-box;
}


.fixed-side {
	visibility:visible;
}

</style>

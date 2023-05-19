<script lang='ts'>
import ReservationModalVue from '../riservaSlotCircolo/ReservationModal.vue';
import ItemSlot, { Color } from './ItemSlot.vue';


    export default {
    name: "SlotColumn",
    data() {
        return {
            oraApertura: new Date(1683961200000),
            oraChiusura: new Date(1684011600000),
            durataSlot: "1:00",
            orari: [''],
            campiInterni: [

                {
                    id: "CAMPO 1",
                    prenotazioni: {
                        7: {
                            nSlot: 7, 
                            color: Color.Red
                        }
                    }
                },

                {
                    id: "CAMPO 2",
                    prenotazioni: {
                        3: {
                            nSlot: 3, 
                            color: Color.Red
                        },
                        4: {
                            nSlot: 4, 
                            color: Color.Yellow
                        },
                        6: {
                            nSlot: 6, 
                            color: Color.Red
                        },
                        7: {
                            nSlot: 7, 
                            color: Color.Yellow
                        }
                    },
                },
                {
                    id: "CAMPO 3",
                    prenotazioni: {
                        6: {
                            nSlot: 6, 
                            color: Color.Red
                        }
                    }
                },
                {
                    id: "CAMPO 4",
                    prenotazioni: {
                        7: {
                            nSlot: 7, 
                            color: Color.Red
                        }
                    }
                },
                {
                    id: "CAMPO 5",
                    prenotazioni: {
                        7: {
                            nSlot: 7, 
                            color: Color.Red
                        }
                    }
                },
                {
                    id: "CAMPO 6",
                    prenotazioni: {
                        7: {
                            nSlot: 7, 
                            color: Color.Red
                        }
                    }
                }


            ],
            campiEsterni: [
            {
                    id: "CAMPO 7",
                    prenotazioni: {
                        "": { 
                            color: Color.Red
                        },
                        3: {
                            nSlot: 3, 
                            color: Color.Yellow
                        }
                    }
                },

                {
                    id: "CAMPO 8",
                    prenotazioni: {
                        6: {
                            nSlot: 6, 
                            color: Color.Red
                        }
            
                    }
                },
                {
                    id: "CAMPO 9",
                    prenotazioni: {
                        6: {
                            nSlot: 6, 
                            color: Color.Red
                        }
            
                    }
                },
                {
                    id: "CAMPO 10",
                    prenotazioni: {
                        6: {
                            nSlot: 6, 
                            color: Color.Red
                        }
            
                    }
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
        showModal(value:number, color: Color){
            this.$refs.modale.openModal(this.orari[value], this.orari[value+1], color)
        }

    },
    mounted(){
        this.findFasceOrarie()
    },
    computed: {
        findColorInterni(){

            // Supponiamo che il numero slot parte da 0
            return (c:number, s:number) => {

                if ( !( c in this.campiInterni ) ) return

                const campo: any = this.campiInterni[c];

                let prenotaz = null;
                if ( s in campo.prenotazioni )
                    prenotaz = campo.prenotazioni[s]

                if ( prenotaz === null ){
                    return Color.Green
                } else return prenotaz.color
        
            }
        },
        findColorEsterni(){

            // Supponiamo che il numero slot parte da 0
            return (c:number, s:number) => {

                if ( !( c in this.campiEsterni ) ) return

                const campo: any = this.campiEsterni[c];

                let prenotaz = null;
                if ( s in campo.prenotazioni )
                    prenotaz = campo.prenotazioni[s]

                if ( prenotaz === null ){
                    return Color.Green
                } else return prenotaz.color

        }
}
    },
    components: { ItemSlot, ReservationModalVue }, 
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
                    <th scope="row" class="text-bluPadelHub text-lg font-circolo bg-white sticky left-0">{{ this.campiInterni[campo-1].id }}</th>   
                    <!-- per ogni fascia oraria guardo se esiste una prenotazione nello slot -->
                    <td v-for="i in (this.orari.length-1)" align="center">
                        <ItemSlot
                            v-on:click.native="showModal(i-1, findColorInterni(campo-1,i))"
                            :color=findColorInterni(campo-1,i)
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
                    <th scope="row" class="text-bluPadelHub text-lg font-circolo bg-white">{{ this.campiEsterni[campo-1].id }}</th>   
                    <!-- per ogni fascia oraria guardo se esiste una prenotazione nello slot -->
                    <td v-for="i in (this.orari.length-1)" align="center">
                        <ItemSlot
                            v-on:click.native="showModal(i-1, findColorEsterni(campo-1,i))"
                            :color=findColorEsterni(campo-1,i)
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

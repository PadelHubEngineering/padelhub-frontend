<template>

    <div class="sticky top-0 bg-white">
        <MobileHeader :ready="true" title='Gioca'>
            <template v-slot:rightSide>
                <img src='/img/logoPadelHub.png' class='h-5/6'/>
            </template>
        </MobileHeader>

        <!-- <Input v-model="input" placeholder="inserisci il tuo indirizzo" label="indirizzo" @input="search"> </Input>
        <p v-for="luoghi in risultati"> {{ luoghi.label }}></p> -->
        <div class="mt-8 mb-5">
            <div class="searchInput active border-2 border-bluPadelHub rounded-lg font-circolo">
                <input type="text" placeholder="Inserire un indirizzo" v-model="input" @input="handleSuggerimenti"/>
                <div class="resultBox">
                    <!-- here list are inserted from javascript -->
                    <li v-for="luoghi in risultati" :key="luoghi" @click="handleRicerca(luoghi)"> {{ luoghi.label }} </li> 
                </div>
                <div class="icon"><i class="fas fa-search"></i></div>
            </div>
            <div class="ml-10 mt-3">
                <DataPicker @update="updateDate"></DataPicker>
            </div>
            <button class="bg-bluPadelHub text-white rounded-lg font-circolo py-3 w-full my-5 shadow-lg" @click="ricercaCircoli">CERCA</button>
        </div>
    </div>


    <!-- SABRINA -->
    <div class="bg-ricercaCircoli  p-0 pt-1 bg-fixed">
        <div v-for="circolo in circoliTrovati">
            <ItemCircoloTrovato :nomeCircolo="circolo.nomeCircolo" :iscritto="circolo.iscritto" :campi="circolo.campi"></ItemCircoloTrovato>
        </div> 
    </div>

</template>



<script setup lang="ts">
import { reactive, ref, computed, onMounted, type Ref } from 'vue';
import '../assets/searchSuggestion.css'
import { BingProvider } from 'leaflet-geosearch';
import { Input } from 'flowbite-vue'
import ItemCampoTipo from '../components/RicercaCircoli/ItemCampoTipo.vue'
import { TipoCampo } from '@/components/RicercaCircoli/TipoCampo.types';
import ItemCircoloTrovato from '@/components/RicercaCircoli/ItemCircoloTrovato.vue';
import MobileHeader from '@/components/MobileHeader.vue'
import DataPicker from '@/components/DataPicker.vue';
import axios, { type AxiosResponse } from "axios";
import { useStore } from "vuex";
import CampoBgIcon from '@/components/icons/CampoBgIcon.vue';

const store = useStore()


    // const provider = new OpenStreetMapProvider();
    const searchProvider = new BingProvider({
    params: {
        key: import.meta.env.VITE_BING_MAP_KEY,
    },
    });

    interface circoloTrovato {
        nomeCircolo: string,
        iscritto: boolean,
        campi: TipoCampo[]
    }

    var circoliTrovati: Ref<circoloTrovato[]> = ref([])

    let input = ref()
    let risultati = reactive({})
    let isFree = 0;
    let data:string;

    async function updateDate(dataValue:Date) {
        let mese = dataValue.getMonth() + 1
        data = dataValue.getFullYear() + "/" + mese.toString().padStart(2, '0') + "/" + (dataValue.getDate()).toString().padStart(2, '0') 
    }

    async function handleSuggerimenti() {
        if (isFree <= 20) {
            isFree++
            const results = await searchProvider.search({ query: input.value });
            Object.assign(risultati, results)
            isFree--
        }
        console.log(risultati)
    }
    async function handleRicerca(key: any) {
        console.log(key)
        input.value = key.label
    }

    async function ricercaCircoli(){

        circoliTrovati.value = [] 

        if (!axios) return

        let response: AxiosResponse | undefined;

        try{
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/ricercaCircoli?luogo=${input.value}&data=${data}`, //Impostare l'URL a cui collagarsi
                {
                    headers: {
                        'x-access-token': store.state.auth.token
                    }
                }
            )


        } catch( err: any ) {
            console.log(err)
        }

        if(response){
            response.data.payload.forEach((circolo:any)=>{

                let circoloTrovato: circoloTrovato = {
                    nomeCircolo: circolo.nome,
                    iscritto: circolo.iscritto,
                    campi: []
                }

                let interni = 0
                let esterni = 0

                circolo.campi.forEach((campo:any) => {
                    if(campo.Tipologia === 'Interno') interni++;
                    if(campo.Tipologia === 'Esterno') esterni++; 
                })

                if(interni>0) circoloTrovato.campi.push(TipoCampo.Interno)
                if(esterni>0) circoloTrovato.campi.push(TipoCampo.Esterno)

                circoliTrovati.value.push(circoloTrovato)

            })
        }


    }

    onMounted(()=>{
        updateDate(new Date())
    })

</script>
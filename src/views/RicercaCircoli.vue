<template>
    <!-- <Input v-model="input" placeholder="inserisci il tuo indirizzo" label="indirizzo" @input="search"> </Input>
    <p v-for="luoghi in risultati"> {{ luoghi.label }}></p> -->
    <div class="container">
        <div class="searchInput active">
            <input type="text" placeholder="Inserire un indirizzo" v-model="input" @input="handleSuggerimenti"/>
            <div class="resultBox">
                <!-- here list are inserted from javascript -->
                <li v-for="luoghi in risultati" :key="luoghi" @click="handleRicerca(luoghi)"> {{ luoghi.label }} </li> 
            </div>
            <div class="icon"><i class="fas fa-search"></i></div>
        </div>
    </div>


    <!-- SABRINA -->
    <div> 
        <ItemCircoloTrovato></ItemCircoloTrovato>
    </div>

</template>



<script setup lang="ts">
import { reactive, ref } from 'vue';
import '../assets/searchSuggestion.css'
import { BingProvider } from 'leaflet-geosearch';
import { Input } from 'flowbite-vue'
import ItemCampoTipo from '../components/RicercaCircoli/ItemCampoTipo.vue'
import { TipoCampo } from '@/components/RicercaCircoli/TipoCampo.types';
import ItemCircoloTrovato from '@/components/RicercaCircoli/ItemCircoloTrovato.vue';

// const provider = new OpenStreetMapProvider();
const searchProvider = new BingProvider({
  params: {
    key: import.meta.env.VITE_BING_MAP_KEY,
  },
});
let input = ref()
let risultati = reactive({})
let isFree = 0;

async function handleSuggerimenti() {
    if (isFree <= 20) {
        isFree++
        const results = await searchProvider.search({ query: input.value });
        Object.assign(risultati, results)
        isFree--
    }
}
async function handleRicerca(key: any) {
    console.log(key)
    input.value = key.label
}


</script>
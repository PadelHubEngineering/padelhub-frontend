<template>
    <div class="sticky top-0 bg-white">
        <MobileHeader :ready="true" title='Gioca'>
            <template v-slot:rightSide>
                <img src='/img/logoPadelHub.png' class='h-5/6' />
            </template>
        </MobileHeader>

        <!-- <Input v-model="input" placeholder="inserisci il tuo indirizzo" label="indirizzo" @input="search"> </Input>
        <p v-for="luoghi in risultati"> {{ luoghi.label }}></p> -->
        <div class="mt-8 mb-5">
            <div class="searchInput active border-2 border-bluPadelHub rounded-lg font-circolo">
                <input type="text" placeholder="Inserire un indirizzo" v-model="input" @input="handleSuggerimenti" />
                <div class="resultBox">
                    <!-- here list are inserted from javascript -->
                    <li v-for="luoghi in risultati" :key="luoghi" @click="handleRicerca(luoghi)"> {{ luoghi.label }} </li>
                </div>
                <div class="icon"><i class="fas fa-search"></i></div>
            </div>
            <div class="ml-10 mt-3">
                <DataPicker @update="updateDate"></DataPicker>
            </div>
            <button class="bg-bluPadelHub text-white rounded-lg font-circolo py-3 w-full my-5 shadow-lg disabled:bg-bluPadelHubHover"
                @click="ricercaCircoli" :disabled="!cliccatoSuggestion">CERCA</button>
        </div>
    </div>


    <!-- SABRINA -->
    <div class="bg-ricercaCircoli  p-0 pt-1 bg-fixed">
        <div v-for="circolo in circoliTrovati">
            <ItemCircoloTrovato :nomeCircolo="circolo.nomeCircolo" :iscritto="circolo.iscritto" :campi="circolo.campi">
            </ItemCircoloTrovato>
        </div>
    </div>
</template>



<script setup lang="ts">
import { reactive, ref, computed, onMounted } from 'vue';
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

const store = useStore()


// const provider = new OpenStreetMapProvider();
const searchProvider = new BingProvider({
    params: {
        key: import.meta.env.VITE_BING_MAP_KEY,
    },
});

const circoliTrovati = [
    {
        nomeCircolo: "Beppone",
        iscritto: true,
        campi: [TipoCampo.Esterno, TipoCampo.Interno]
    },
    {
        nomeCircolo: "WPadel",
        iscritto: true,
        campi: [TipoCampo.Esterno]
    },
    {
        nomeCircolo: "InPadelWeHub",
        iscritto: true,
        campi: [TipoCampo.Interno]

    }
]


let input = ref()
let risultati = reactive({})
let cliccatoSuggestion = ref(false)
let isFree = 0;
let data: string;
let location = {
    x: null,
    y: null
}

async function updateDate(dataValue: Date) {
    let mese = dataValue.getMonth() + 1
    data = dataValue.getFullYear() + "/" + mese.toString().padStart(2, '0') + "/" + (dataValue.getDate()).toString().padStart(2, '0')
}

async function handleSuggerimenti() {
    cliccatoSuggestion.value = false
    if (isFree <= 20) {
        isFree++
        const results = await searchProvider.search({ query: input.value });
        Object.assign(risultati, results)
        isFree--
    }
    //console.log(risultati)
}
async function handleRicerca(key: any) {
    console.log(key)
    input.value = key.label
    location.x = key.x
    location.y = key.y
    cliccatoSuggestion.value = true
    risultati = reactive({})
}

async function ricercaCircoli() {
    console.log("Luogo: " + input.value + ", Data: " + data)

    if (!axios) return

    let response: AxiosResponse | undefined;

    if (location.x != null && location.y != null) {
        try {
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/ricercaCircoli?x=${location.x}&y=${location.y}&data=${data}`, //Impostare l'URL a cui collagarsi
                {
                    headers: {
                        'x-access-token': store.state.auth.token
                    }
                }
            )
        } catch (err: any) {
            console.log(err)
        }
    }
    else{
        console.log("Devi cliccare sulle suggestion!");
    }



    console.log(response)

}

onMounted(() => {
    updateDate(new Date())
})

</script>
<template>
    <div class="sticky top-0 bg-white">
        <MobileHeader :ready="true" title='Gioca'>
            <template v-slot:leftSide>
                <img src='/img/indietro_white.png' v-on:click="router.go(-1)">
            </template>
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
            <button
                class="bg-bluPadelHub text-white rounded-lg font-circolo py-3 w-full my-5 shadow-lg disabled:bg-bluPadelHubHover"
                @click="ricercaCircoli" :disabled="!cliccatoSuggestion">CERCA</button>
        </div>
    </div>


    <!-- SABRINA -->
    <div class="bg-gradient-to-r from-bluPadelHub to-arancio p-0 pt-1 bg-fixed h-screen bg-no-repeat bg-bottom">
        <div v-for="circolo in circoliTrovati">
            <ItemCircoloTrovato :nomeCircolo="circolo.nomeCircolo" :iscritto="circolo.iscritto" :campi="circolo.campi">
            </ItemCircoloTrovato>
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
import CampoBgIcon from '@/components/icons/CampoBgIcon.vue';
import { useAuthUserStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const authUserStore = useAuthUserStore()
const router = useRouter();

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
let cliccatoSuggestion = ref(false)
let isFree = 0;
let data: string;
let circoliList: any[] = []
let location = {
    x: null,
    y: null
}
let circoloSet: string | null = null

async function updateDate(dataValue: Date) {
    let mese = dataValue.getMonth() + 1
    data = dataValue.getFullYear() + "/" + mese.toString().padStart(2, '0') + "/" + (dataValue.getDate()).toString().padStart(2, '0')
}

async function handleSuggerimenti() {
    cliccatoSuggestion.value = false
    if (isFree <= 20) {
        isFree++
        const results: any[] = []
        const luoghi: any[] = await searchProvider.search({ query: input.value });
        luoghi.forEach((luogo) => {
            if (results.findIndex((el) => { return el.label == luogo.label }) == -1) {
                results.push(luogo)
            }
        })
        filterItems(circoliList, input.value).forEach((circolo) => {
            const toPush: any = { _id: circolo._id, label: `circolo: ${circolo.nome}`, type: "Circolo" }
            if (results.findIndex((el) => { return el.label == toPush.label }) == -1) {
                results.push(toPush)
            }
        })
        //Svuota l'oggetto reactive 'risultati' senza perdere reactivity
        Object.keys(risultati).forEach(key => delete risultati[key as keyof typeof risultati]);
        Object.assign(risultati, results)

        isFree--
    }
}
function filterItems(arr: any[], query: string): any[] {
    if (query == "")
        return []
    return arr.filter((el) => el.nome.toLowerCase().includes(query.toLowerCase()));
}
async function handleRicerca(key: any) {
    console.log(key)
    if (key.type == "Circolo") {
        circoloSet = key._id
        location.x = null
        location.y = null
    }
    else {
        location.x = key.x
        location.y = key.y
        circoloSet = null
    }
    input.value = key.label
    cliccatoSuggestion.value = true
    //Svuota l'oggetto reactive 'risultati' senza perdere reactivity
    Object.keys(risultati).forEach(key => delete risultati[key as keyof typeof risultati]);
}

async function ricercaCircoli() {

    circoliTrovati.value = []

    if (!axios) return

    let response: AxiosResponse | undefined;
    if (location.x != null && location.y != null) {
        try {
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/ricercaCircoli?x=${location.x}&y=${location.y}&data=${data}`, //Impostare l'URL a cui collagarsi
                {
                    headers: {
                        'x-access-token': authUserStore.token
                    }
                }
            )
        } catch (err: any) {
            console.log(err)
        }
    }
    else if (circoloSet != null) {
        try {
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/ricercaCircoli?circolo=${circoloSet}&data=${data}`, //Impostare l'URL a cui collagarsi
                {
                    headers: {
                        'x-access-token': authUserStore.token
                    }
                }
            )

        } catch (err: any) {
            console.log(err)
        }
    }
    else {
        console.log("Devi cliccare sulle suggestion!");
    }

    if (response) {
        circoliTrovati.value = []
        response.data.payload.forEach((circolo: any) => {

            let circoloTrovato: circoloTrovato = {
                nomeCircolo: circolo.nome,
                iscritto: circolo.iscritto,
                campi: []
            }

            let interni = 0
            let esterni = 0

            circolo.campi.forEach((campo: any) => {
                if (campo.tipologia === 'Interno') interni++;
                if (campo.tipologia === 'Esterno') esterni++;
            })

            if (interni > 0) circoloTrovato.campi.push(TipoCampo.Interno)
            if (esterni > 0) circoloTrovato.campi.push(TipoCampo.Esterno)

            circoliTrovati.value.push(circoloTrovato)

        })
    }



    console.log(response)

}

onMounted(async () => {
    updateDate(new Date())

    //per suggestion circoli
    try {
        const { data, status } = await axios.get(
            `${import.meta.env.VITE_BACK_URL}/api/v1/ricercaCircoli/getCircoli`,
        )
        if (status == 200) {
            circoliList = data.payload
        }
    } catch (err: any) {
        console.log(err)
    }
})

</script>

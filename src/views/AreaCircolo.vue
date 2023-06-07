<template>
    <div class="grid grid-cols-8">
        <CircoloMenuComponent class='col-span-2' />
        <div class="col-span-6">
            <!-- <div class="grid grid-cols-6 px-6">
                <Carousel class="col-span-4 px-2" :slide=false></Carousel>
                <Button class="col-span-2 px-2"> + </Button>
            </div> -->
            <div class="col-span-2 place-items-center pt-10">
                <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-bluPadelHub">
                    Anagrafica</h1>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 px-10 py-10 gap-6">
                <CampoNome v-model="data.anagrafica.nome" :val="data.anagrafica.nome"></CampoNome>
                <Input placeholder="Inserisci un indirizzo" label="Indirizzo" v-model="data.anagrafica.indirizzo" />
                <CampoTelefono v-model="data.anagrafica.telefono" :val="data.anagrafica.telefono"></CampoTelefono>
                <CampoEmail v-model="data.anagrafica.email" :val="data.anagrafica.email"></CampoEmail>
                <Input placeholder="Inserisci la Partita Iva" label="Partita Iva | Codice Fiscale"
                    v-model="data.anagrafica.partitaIVA" @change="logData" />
                <div></div>
                <hr class="col-span-2 w-48 h-1 mx-auto my-4 bg-bluPadelHub border-0 rounded">
                <div class="col-span-2 place-items-center">
                    <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-bluPadelHub">
                        Partite e Campi</h1>
                </div>
                <div class="grid grid-cols-3 px-5 py-5 gap-5">
                    <div>Orari</div>
                    <div>Apertura</div>
                    <div>Chiusura</div>
                    <AperturaChiusura class="col-span-3" @orari="getOrari" :giorno=item :key="item" v-for="item in days"
                        :apertura="data.struttura.orariStruttura[days.indexOf(item)].orarioApertura"
                        :chiusura="data.struttura.orariStruttura[days.indexOf(item)].orarioChiusura"
                        :isAperto="data.struttura.orariStruttura[days.indexOf(item)].isAperto" />
                </div>
                <div class="grid grid-cols-3 px-5 py-5 gap-5">
                    <div></div>
                    <div>Standard</div>
                    <div>Sconto Iscritti (%)</div>

                    <div>Prezzi/partita</div>
                    <Input size="sm" v-model="data.struttura.prezzoSlotOrario" />
                    <Input size="sm" v-model="data.struttura.scontoAffiliazione" />

                    <div>Quota Iscrizione</div>
                    <Input size="sm" v-model="data.struttura.quotaAffiliazione" />
                </div>
                <div class="grid grid-cols-2 px-5 py-5 gap-5 place-items-center">
                    <NumeroCampi tipoCampo="Interno" @nCampi="(val) => data.struttura.nCampiInterni = val"
                        :val="data.struttura.nCampiInterni"></NumeroCampi>
                    <NumeroCampi tipoCampo="Esterno" @nCampi="(val) => data.struttura.nCampiEsterni = val"
                        :val="data.struttura.nCampiEsterni"></NumeroCampi>
                </div>
                <div class="grid place-center">
                    <div class="">
                        <h1 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-bluPadelHub">
                            Durata Slot Partita</h1>
                    </div>
                    <div>
                        <div class="grid grid-cols-2" v-for="item in duration">
                            <input type="radio" v-model="data.struttura.durataSlot" :value="item" />
                            <label>{{ item }} min</label>
                        </div>
                    </div>
                </div>
                <hr class="col-span-2 w-48 h-1 mx-auto my-4 bg-bluPadelHub border-0 rounded">
                <div class="col-span-2 place-items-center">
                    <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-bluPadelHub">
                        Servizi Aggiuntivi</h1>
                </div>
                <div class="col-span-2 grid grid-cols-1 md:grid-cols-2 px-5 py-5 gap-5">
                    <div>
                        <div class="pb-5">
                            <h1 class="mb-4 text-2xl font-extrabold leading-none tracking-tight text-bluPadelHub">
                                Lista Servizi</h1>
                        </div>
                        <list-group>
                            <list-group-item class="grid grid-cols-2" :hover="false"
                                v-for="item in data.servizio.serviziAggiuntivi" :key="item">
                                {{ item }}
                                <Button @click="removeService(item)">X</Button>
                            </list-group-item>
                        </list-group>
                    </div>
                    <div class="grid px-5 py-5 gap-5 ">
                        <Input placeholder="inserisci il nome del servizio" v-model="inputServizi"></Input>
                        <Button class="bg-bluPadelHub" @click="addServizio">Aggiungi servizio</Button>
                    </div>
                </div>
                <Button class="col-span-2" @click="submitValues">Effettua Modifiche</Button>
                <Modal size="xs" v-if="isShowModal" @close="closeModal">
                    <template #header>
                        <div class="flex items-center text-lg">
                            Modifica dati circolo
                        </div>
                    </template>
                    <template #body>

                        <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {{ statusMessage }}
                        </p>
                    </template>
                    <template #footer>
                        <div class="flex justify-between">
                            <button @click="closeModal" type="button"
                                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Chiudi
                            </button>
                        </div>
                    </template>
                </Modal>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CircoloMenuComponent from '@/components/CircoloMenuItems/CircoloMenuComponent.vue';
import NumeroCampi from '@/components/AreaCircolo/NumeroCampi.vue';
import CampoTelefono from '@/components/Registrazione/CampoTelefono.vue';
import CampoNome from '@/components/Registrazione/CampoNome.vue';
import CampoEmail from '@/components/Registrazione/CampoEmail.vue';
import { Button, Input, ListGroup, ListGroupItem, ButtonGroup, Modal } from 'flowbite-vue'
import AperturaChiusura from '@/components/AreaCircolo/AperturaChiusura.vue';
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';
import { getCurrentInstance } from 'vue'
import { useAuthUserStore } from '@/stores/authStore';

const instance = getCurrentInstance();

const authUserStore = useAuthUserStore()

const days = ["Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato", "Domenica"]
const duration = [60, 90, 120]
let selected = ref();
let inputServizi = ref(null);
let responseError: string;
let isShowModal = ref(false)
let statusMessage = ref("")

let data = reactive({
    anagrafica: {
        nome: "",
        telefono: "",
        email: "", //read only
        indirizzo: "",
        partitaIVA: ""
    },
    struttura: {
        orariStruttura: [
            {
                giorno: 0,
                isAperto: false,
                orarioApertura: "",
                orarioChiusura: ""
            },
            {
                giorno: 1,
                isAperto: false,
                orarioApertura: "",
                orarioChiusura: ""
            },
            {
                giorno: 2,
                isAperto: false,
                orarioApertura: "",
                orarioChiusura: ""
            },
            {
                giorno: 3,
                isAperto: false,
                orarioApertura: "",
                orarioChiusura: ""
            },
            {
                giorno: 4,
                isAperto: false,
                orarioApertura: "",
                orarioChiusura: ""
            },
            {
                giorno: 5,
                isAperto: false,
                orarioApertura: "",
                orarioChiusura: ""
            },
            {
                giorno: 6,
                isAperto: false,
                orarioApertura: "",
                orarioChiusura: ""
            },
        ],
        durataSlot: 60,
        quotaAffiliazione: 20,
        prezzoSlotOrario: 14,
        scontoAffiliazione: 20,
        nCampiInterni: 0,
        nCampiEsterni: 0
    },
    servizio: {
        serviziAggiuntivi: []
    }
})

onMounted(async () => {
    axios.get(
        `${import.meta.env.VITE_BACK_URL}/api/v1/circolo/datiCircolo`, {
        headers: {
            'x-access-token': authUserStore.token
        }
    }
    ).then(response => {
        const { HTTPCode, success, payload } = response.data;
        //data = reactive(payload)
        Object.assign(data, payload)
    }).catch(err => {
        const { message } = err.response.data;
        responseError = message
    })
})

function addServizio() {
    if (inputServizi.value)
        data.servizio.serviziAggiuntivi.push(inputServizi.value)
    inputServizi.value = null
}
function removeService(key: any) {
    data.servizio.serviziAggiuntivi.splice(data.servizio.serviziAggiuntivi.indexOf(key as never), 1);
}
function getOrari(value: any) {
    data.struttura.orariStruttura[days.indexOf(value["giorno"])].giorno = days.indexOf(value["giorno"])
    data.struttura.orariStruttura[days.indexOf(value["giorno"])].isAperto = value["isAperto"]
    data.struttura.orariStruttura[days.indexOf(value["giorno"])].orarioApertura = value["apertura"]
    data.struttura.orariStruttura[days.indexOf(value["giorno"])].orarioChiusura = value["chiusura"]
    console.log(data.struttura.orariStruttura)
}

async function submitValues() {
    try {
        data.struttura.durataSlot = Number(data.struttura.durataSlot);
        data.struttura.nCampiEsterni = Number(data.struttura.nCampiEsterni)
        data.struttura.nCampiInterni = Number(data.struttura.nCampiInterni)
        data.struttura.prezzoSlotOrario = Number(data.struttura.prezzoSlotOrario)
        data.struttura.quotaAffiliazione = Number(data.struttura.quotaAffiliazione)
        data.struttura.scontoAffiliazione = Number(data.struttura.scontoAffiliazione)
    }
    catch { }

    console.log("Submitted")
    if (!axios) return
    const resp = Object.assign(data, { token: authUserStore.token })
    console.log(resp)
    axios.post(
        `${import.meta.env.VITE_BACK_URL}/api/v1/circolo/inserimentoDatiCircolo`, resp
    ).then(response => {
        console.log(response)
        const { HTTPCode, success, message } = response.data;
        statusMessage = message
        isShowModal.value = true;
    }).catch(err => {
        const { message } = err.response.data;
        console.log(message)
        responseError = message
    })
}
function closeModal(){
    isShowModal.value = false
}
function logData() {
    console.log(data)
}
</script>

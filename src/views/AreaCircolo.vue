<template>
    <div class="grid grid-cols-8">
        <CircoloMenuComponent class='col-span-2' />
        <div class="col-span-6">
            <div class="grid grid-rows-2">
                <div class="grid grid-cols-6 px-6">
                    <Carousel class="col-span-4 px-2" :slide=false></Carousel>
                    <Button class="col-span-2 px-2"> + </Button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 px-10 py-10 gap-6">
                    <Input placeholder="Inserisci un nome" label="Nome" />
                    <Input placeholder="Inserisci un indirizzo" label="Indirizzo" />
                    <Input placeholder="Inserisci un telefono" label="Telefono" />
                    <Input placeholder="Inserisci la tua E-mail" label="E-mail" />
                    <Input placeholder="Inserisci la Partita Iva" label="Partita Iva | Codice Fiscale" />
                    <div></div>
                    <hr class="col-span-2 w-48 h-1 mx-auto my-4 bg-bluPadelHub border-0 rounded">
                    <div class="col-span-2 place-items-center">
                        <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-bluPadelHub">
                            Partite e Campi</h1>
                    </div>
                    <div class="grid grid-cols-3 px-5 py-5 gap-5">
                        <select class="col-span-3" v-model="selected">
                            <option value="Tutti i giorni">Tutti i giorni</option>
                            <option v-for="item in days">{{ item }}</option>
                        </select>
                        <div>Orari</div>
                        <div>Apertura</div>
                        <div>Chiusura</div>
                        <AperturaChiusura :giorno=selected />
                    </div>
                    <div class="grid grid-cols-3 px-5 py-5 gap-5">
                        <div></div>
                        <div>Standard</div>
                        <div>Iscritto</div>

                        <div>Prezzi/partita</div>
                        <Input size="sm" />
                        <Input size="sm" />

                        <div>Quota Iscrizione</div>
                        <Input size="sm" />
                    </div>
                    <div class="grid grid-cols-2 px-5 py-5 gap-5">
                        <Input size="sm" label="Numero Campi Interni" />
                        <Input size="sm" label="Numero Campi Esterni" />
                    </div>
                    <div class="grid px-5 py-5 gap-5 place-center">
                        <div class="">Durata Slot Partita</div>
                        <div>
                            <div class="grid grid-cols-2" v-for="item in duration">
                                <input type="radio" v-model="durataSlot" :value="item" />
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
                        <list-group>
                            <list-group-item class="grid grid-cols-2" :hover="false" v-for="item in servizi" :key="item">
                                {{ item }}
                                <Button @click="removeService(item)">X</Button>
                            </list-group-item>
                        </list-group>
                        <div class="grid px-5 py-5 gap-5 ">
                            <Input placeholder="inserisci il nome del servizio" v-model="inputServizi"></Input>
                            <Button class="bg-bluPadelHub" @click="addServizio">Aggiungi servizio</Button>
                        </div>
                    </div>
                    <Button class="col-span-2">Effettua Modifiche</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CircoloMenuComponent from '@/components/CircoloMenuItems/CircoloMenuComponent.vue';
import { Carousel, Button, Input, ListGroup, ListGroupItem, ButtonGroup } from 'flowbite-vue'
import AperturaChiusura from '@/components/AreaCircolo/AperturaChiusura.vue';
import { reactive, ref } from 'vue';
const days = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]
const duration = [60, 90, 120]
const servizi = reactive([])


let selected = ref("Lun");
let inputServizi = ref(null);
let durataSlot = ref();

function addServizio() {
    if (inputServizi.value)
        servizi.push(inputServizi.value)
    inputServizi.value = null
}
function removeService(key: any) {
    servizi.splice(servizi.indexOf(key as never), 1);
}

</script>
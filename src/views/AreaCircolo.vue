<template>
    <div class="flex h-screen w-screen">
        <CircoloMenuComponent class='w-1/5 min-w-[300px]' />
        <div class="w-4/5 max-w-4/5 ml-5 mt-5 overflow-x-auto">
            <div class="grid grid-rows-2">
                <div class="flex px-6 max-h-50">
                    <Carousel class="w-4/6 px-2" :slide=false></Carousel>
                    <Button class="w-2/6 flex-auto px-2"> + </Button>
                </div>
                <div class="grid grid-cols-2 px-10 py-10 gap-6">
                    <Input placeholder="Inserisci un nome" label="Nome" />
                    <Input placeholder="Inserisci un indirizzo" label="Indirizzo" />
                    <Input placeholder="Inserisci un telefono" label="Telefono" />
                    <Input placeholder="Inserisci la tua E-mail" label="E-mail" />
                    <Input placeholder="Inserisci la Partita Iva" label="Partita Iva | Codice Fiscale" />
                    <div></div>

                    <div class="grid grid-cols-3">
                        <select class="col-span-3" v-model="selected">
                            <option value="Tutti i giorni">Tutti i giorni</option>
                            <option v-for="item in days">{{ item }}</option>
                        </select>
                        <div>Orari</div>
                        <div>Apertura</div>
                        <div>Chiusura</div>
                        <AperturaChiusura :giorno=selected />
                    </div>
                    <div class="grid grid-cols-3">
                        <div></div>
                        <div>Standard</div>
                        <div>Iscritto</div>

                        <div>Prezzi/partita</div>
                        <Input size="sm" />
                        <Input size="sm" />
                
                        <div>Quota Iscrizione</div>
                        <Input size="sm" />
                    </div>
                    <div class="grid grid-cols-2">
                        <Input size="sm" label="Numero Campi Interni"/>
                        <Input size="sm" label="Numero Campi Esterni" />
                    </div>
                    <div class="grid grid-cols-3">
                        <div class="col-span-3">Durata Slot Partita</div>
                        <Button>1h</Button>
                        <Button>1h 30min</Button>
                        <Button>2h</Button>
                    </div>



                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CircoloMenuComponent from '@/components/CircoloMenuItems/CircoloMenuComponent.vue';
import { Carousel, Button, Input } from 'flowbite-vue'
import AperturaChiusura from '@/components/AreaCircolo/AperturaChiusura.vue';
import { ref } from 'vue';
const days = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]
let selected = ref("Lun");
</script>
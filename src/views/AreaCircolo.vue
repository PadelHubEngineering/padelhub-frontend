<template>
    <div class="flex h-screen w-screen">
        <CircoloMenuComponent class='w-1/5 min-w-[300px]' />
        <div class="w-4/5 max-w-4/5 ml-5 mt-5 overflow-x-auto">
            <div class="grid grid-rows-2">
                <div class="flex px-6">
                    <Carousel class="w-4/6 px-2" :slide=false></Carousel>
                    <Button class="w-2/6 flex-auto px-2"> + </Button>
                </div>
                <div class="grid grid-cols-2 px-10 py-10 gap-6">
                    <Input placeholder="Inserisci un nome" label="Nome" />
                    <Input placeholder="Inserisci un indirizzo" label="Indirizzo" />
                    <Input placeholder="Inserisci un telefono" label="Telefono" />
                    <Input placeholder="Inserisci la tua E-mail" label="E-mail" />
                    <Input placeholder="Inserisci la Partita Iva" label="Partita Iva | Codice Fiscale" />
                </div>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import CircoloMenuComponent from '@/components/CircoloMenuItems/CircoloMenuComponent.vue';
import { Carousel, Button, Input } from 'flowbite-vue'


</script>
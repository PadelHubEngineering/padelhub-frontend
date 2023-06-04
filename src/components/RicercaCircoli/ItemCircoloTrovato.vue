<script setup lang="ts">

import { TipoCampo } from './TipoCampo.types';
import ItemCampoTipo from './ItemCampoTipo.vue';
import PartitaHeader from '../partite/PartitaHeader.vue';

const obj = {
    nomeCircolo: "Beppone",
    iscritto: true,
    campi: [TipoCampo.Esterno, TipoCampo.Interno]
}


</script>


<template>
    
    <div class="bg-white p-2 text-bluPadelHub border-2 border-bluPadelHub rounded-lg">
        <div class="font-semibold">
        <PartitaHeader :iscritto="obj.iscritto" :nome-circolo="obj.nomeCircolo"></PartitaHeader> 
        </div>
        <div v-for="tipo in obj.campi">
            <ItemCampoTipo :tipo=tipo></ItemCampoTipo>
        </div>
    </div>


</template>



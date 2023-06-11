<script setup lang="ts">

import { TipoCampo } from './TipoCampo.types';
import ItemCampoTipo from './ItemCampoTipo.vue';
import PartitaHeader from '../partite/PartitaHeader.vue';


const props = defineProps({
        nomeCircolo: { type: String, required: false },
        iscritto: { type: Boolean, required: false },
        campi: { type: Array<TipoCampo>, required:false},
        date: { type: String, required:false},
        idCircolo: { type: String, required:false},
    })

</script>


<template>
    
    <div class="bg-white p-2 text-bluPadelHub border-2 border-bluPadelHub rounded-lg my-3 bg-opacity-70 w-full">
        <div class="font-semibold">
            <PartitaHeader 
            :iscritto="props.iscritto" 
            :nome-circolo="props.nomeCircolo">
            </PartitaHeader> 
        </div>
        <div v-for="tipo in props.campi">
            <ItemCampoTipo 
            :tipo=tipo 
            :date=date 
            :idCircolo=idCircolo></ItemCampoTipo>
        </div>
    </div>
</template>



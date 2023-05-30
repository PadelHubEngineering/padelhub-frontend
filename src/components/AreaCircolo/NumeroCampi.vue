<template>
    <div class="grid grid-rows-2 grid-cols-2 gap-0.5 ">
        <Input class="row-span-2" :label="campoLabel" disabled v-model="numeroCampi"/>
        <button class="w-5 h-5 bg-bluPadelHub text-white rounded-lg " @click="aggiungiCampo">+</button>
        <button class="w-5 h-5 bg-bluPadelHub text-white rounded-lg " @click="togliCampo">-</button>
    </div>
</template>

<script setup lang="ts">
import { Button, Input } from 'flowbite-vue'
import { ref } from 'vue';
const props = defineProps({
    tipoCampo: String
})
let campoLabel = "Campo " +  props.tipoCampo;
let numeroCampi = ref(0);

function aggiungiCampo(){
    numeroCampi.value++;
}
function togliCampo(){
    if(numeroCampi.value != 0)
        numeroCampi.value--;
}
</script>


<template>
    <div class="grid grid-cols-4">
        <div>{{ props.giorno }}</div>
        <CampoOra name="apertura" v-model="apertura" @change="handleResult" :val="apertura"></CampoOra>
        <CampoOra name="chiusura" v-model="chiusura" @change="handleResult" :val="chiusura"></CampoOra>
        <Input type="checkbox" label="E' aperto?" v-model="isAperto" @change="handleResult"></Input>
    </div>
</template>

<script setup lang="ts">
import { booleanLiteral, ifStatement, is, regExpLiteral } from '@babel/types';
import { Carousel, Button, Input } from 'flowbite-vue'
import { onUpdated, ref } from 'vue';
import { errors, validateTimeField } from '@/modules/formValidation';
import CampoOra from '../AreaCircolo/CampoOra.vue';
import { processSlotOutlet } from '@vue/compiler-core';

let chiusura = ref("");
let apertura = ref("");
let isAperto = ref();
let countUpdate = 0;

const props = defineProps({
    giorno: String,
    apertura: String,
    chiusura: String,
    isAperto: Boolean
})
const emit = defineEmits(['orari'])

onUpdated(() => {
    if (countUpdate == 0) {
        apertura.value = props.apertura!;
        chiusura.value = props.chiusura!;
        isAperto.value = props.isAperto!;
    }
    countUpdate++;
})


function handleResult() {
    let aperturaDate = new Date(0, 0)
    if (apertura.value != "") {
        aperturaDate.setHours(Number(apertura.value.split(":")[0]) + 1)
        aperturaDate.setMinutes(Number(apertura.value.split(":")[1]))
    }
    let chiusuraDate = new Date(0, 0)
    if (chiusura.value != "") {
        chiusuraDate.setHours(Number(chiusura.value.split(":")[0]) + 1)
        chiusuraDate.setMinutes(Number(chiusura.value.split(":")[1]))
    }
    //console.log(aperturaDate)
    emit('orari', {
        isAperto: isAperto.value,
        giorno: props.giorno,
        apertura: aperturaDate.toISOString(),
        chiusura: chiusuraDate.toISOString()
    })
}


</script>
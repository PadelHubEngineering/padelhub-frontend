<template>
    <div>{{ props.giorno }}</div>
    <CampoOra name="apertura" v-model="apertura" @change="handleResult" ></CampoOra>
    <CampoOra name="chiusura" v-model="chiusura" @change="handleResult" ></CampoOra>
    <Input type="checkbox" label="E' aperto?" v-model="isAperto" @change="handleResult"></Input>
</template>

<script setup lang="ts">
import { regExpLiteral } from '@babel/types';
import { Carousel, Button, Input } from 'flowbite-vue'
import { onUpdated, ref } from 'vue';
import { errors, validateTimeField } from '@/modules/formValidation';
import CampoOra from '../AreaCircolo/CampoOra.vue';

let chiusura = ref("");
let apertura = ref("");
let isAperto = ref();

const props = defineProps({
    giorno: String,
    apertura: String,
    chiusura: String,
})
const emit = defineEmits(['orari'])

onUpdated(() => handleResult)

function handleResult() {
    let aperturaDate = new Date(0, 0)
    aperturaDate.setHours(Number(apertura.value.split(":")[0]))
    aperturaDate.setMinutes(Number(apertura.value.split(":")[1]))
    let chiusuraDate = new Date(0, 0)
    chiusuraDate.setHours(Number(chiusura.value.split(":")[0]))
    chiusuraDate.setMinutes(Number(chiusura.value.split(":")[1]))
    emit('orari', {
        isAperto: isAperto.value,
        giorno: props.giorno,
        apertura: aperturaDate.toDateString(),
        chiusura: chiusuraDate.toDateString()
    })
}


</script>
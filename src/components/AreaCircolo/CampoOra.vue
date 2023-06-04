<template>
    <Input size="sm" placeholder="hh:mm" @keyup="validateInput" @blue="validateInput" v-model="orario"
        @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)"
        @change="$emit('change', ($event!.target! as HTMLInputElement).value)" />
    <div class="text-redBusy" v-if="errors[props.name!]">
        {{ errors[props.name!] }}
    </div>
</template>

<script setup lang="ts">
import { Carousel, Button, Input } from 'flowbite-vue'
import { ref, onUpdated } from 'vue';
import { errors, validateTimeField } from '@/modules/formValidation';

let countUpdate = 0;

let orario = ref<string | null>(null)
const props = defineProps({
    val: String,
    name: String
})
const emit = defineEmits(['change'])

onUpdated(() => {
    //console.log(props.val)
    if (countUpdate == 0){
        let date = new Date(props.val!);
        orario.value = `${date.getHours() != 0 ? date.getHours()-1 : "23" }:${date.getMinutes() != 0 ? date.getMinutes() : '00'}`
    }
    countUpdate++
})
function validateInput() {
    validateTimeField(props.name!, orario.value)
}
</script>
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
import { ref } from 'vue';
import { errors, validateTimeField } from '@/modules/formValidation';

let orario = ref<string | null>(null)
const props = defineProps({
    name: String
})
const emit = defineEmits(['change'])

function validateInput() {
    validateTimeField(props.name!, orario.value)
}
</script>
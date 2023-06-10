<template>
    <div class="field">
        <div>
            <label for="CampoNome" class="block mb-2 text-sm font-medium">{{ props.label }}</label>
            <Input type="text"  :placeholder="props.placeholder"
                autocomplete="off" v-model="input" @keyup="validateInput" @blue="validateInput" @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)"/>
        </div>
        <div class="text-redBusy" v-if="errors[props.nomeCampo]">
            {{ errors[props.nomeCampo] }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateNameField, errors } from "@/modules/formValidation";
import { ref, computed, onMounted, onUpdated } from "vue";
import { Input } from 'flowbite-vue'
let countUpdate = 0;

const props = defineProps({
    val: {
        type: String
    },
    label: {
        type: String,
        default: "Nome"
    },
    placeholder: {
        type: String,
        default: "Inserisci il nome..."
    },
    nomeCampo: {
        required: true,
        type: String
    }
})

onUpdated(() => {
    if(countUpdate == 0)
        input.value = props.val!
    countUpdate++
})

let input = ref<string | null>(null);
const validateInput = () => {
    validateNameField(props.nomeCampo, input.value);
};

</script>
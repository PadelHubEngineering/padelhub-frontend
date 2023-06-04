<template>
    <div class="field">
        <div>
            <label for="CampoTelefono" class="block mb-2 text-sm font-medium">{{ props.label }}</label>
            <Input type="text" name="telefono" :placeholder="props.placeholder" autocomplete="off" v-model="input"
                @keyup="validateInput" @blue="validateInput"
                @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)" />
        </div>
        <div class="text-redBusy" v-if="errors.telefono">
            {{ errors.telefono }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateTelefonoField, errors } from "@/modules/formValidation";
import { ref, computed, onUpdated } from "vue";
import { Input } from 'flowbite-vue'
import { isValidRegex } from "@/modules/validators";
let countUpdate = 0;

const props = defineProps({
    val: {
        type: String
    },
    label: {
        type: String,
        default: "Telefono"
    },
    placeholder: {
        type: String,
        default: "Inserisci il numero di telefono..."
    }
})

let input = ref<string | null>(null);
onUpdated(() => {
    if (countUpdate == 0)
        input.value = props.val!
    countUpdate++
})
const validateInput = () => {
    validateTelefonoField("telefono", input.value);
};

</script>
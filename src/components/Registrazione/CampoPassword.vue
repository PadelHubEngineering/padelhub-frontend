<template>
    <div class="field">
        <div>
            <label for="CampoEmail" class="block mb-2 text-sm font-medium">{{ props.label }}</label>
            <Input type="password" name="password" :placeholder="props.placeholder"
                autocomplete="off" v-model="passwd" @keyup="validateInput" @blue="validateInput" @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)"/>
        </div>
        <div class="text-redBusy" v-if="errors.password">
            {{ errors.password }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validatePasswordField, errors, validateConfirmPasswordField } from "@/modules/formValidation";
import { ref, computed } from "vue";
import { Input } from 'flowbite-vue'


const props = defineProps({
    label: {
        type: String,
        default: "Password"
    },
    placeholder: {
        type: String,
        default: "Inserisci la password..."
    }
})
let passwd = ref<string | null>(null);
const validateInput = () => {
    validatePasswordField("password", passwd.value);
};
</script>
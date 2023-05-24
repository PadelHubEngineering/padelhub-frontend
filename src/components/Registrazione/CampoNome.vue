<template>
    <div class="field">
        <div>
            <label for="CampoNome" class="block mb-2 text-sm font-medium">Inserisci il nome:</label>
            <input type="text" name="nome"
                class="border border-graySlate sm:text-sm rounded-lg focus:ring-2 focus:border-bluPadelHub block w-full p-2.5"
                autocomplete="off" v-model="input" @keyup="validateInput" @blue="validateInput" @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)"/>
        </div>
        <div class="text-redBusy" v-if="errors.name">
            {{ errors.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateNameField, errors } from "@/modules/formValidation";
import { ref, computed } from "vue";
let input = ref<string | null>(null);
const validateInput = () => {
    validateNameField("name", input.value);
};

</script>
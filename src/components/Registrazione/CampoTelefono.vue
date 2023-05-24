<template>
    <div class="field">
        <div>
            <label for="CampoTelefono" class="block mb-2 text-sm font-medium">Inserisci il numero di telefono:</label>
            <input type="text" name="telefono"
                class="border border-graySlate sm:text-sm rounded-lg focus:ring-2 focus:border-bluPadelHub block w-full p-2.5"
                autocomplete="off" v-model="input" @keyup="validateInput" @blue="validateInput" @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)">
        </div>
        <div class="text-redBusy" v-if="errors.telefono">
            {{ errors.telefono }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateTelefonoField, errors } from "@/modules/formValidation";
import { ref, computed } from "vue";
let input = ref<string | null>(null);
const validateInput = () => {
    validateTelefonoField("telefono", input.value);
};

</script>
<template>
    <div class="">
        <div>
            <label for="CampoEmail" class="block mb-2 text-sm font-medium">Inserisci l'email:</label>
            <input type="text" name="email"
                class="border border-graySlate sm:text-sm rounded-lg focus:ring-2 focus:border-bluPadelHub block w-full p-2.5"
                autocomplete="off" v-model="input" @keyup="validateInput" @blue="validateInput" @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)">
        </div>
        <div class="text-redBusy" v-if="errors.email">
            {{ errors.email }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateEmailField, errors } from "@/modules/formValidation";
import { ref, computed } from "vue";
let input = ref<string | null>(null);
const validateInput = () => {
    validateEmailField("email", input.value);
};

</script>
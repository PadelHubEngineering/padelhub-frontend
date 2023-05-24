<template>
    <div class="field">
        <div>
            <label for="CampoEmail" class="block mb-2 text-sm font-medium">Inserisci la password:</label>
            <input type="password" name="password"
                class="border border-graySlate sm:text-sm rounded-lg focus:ring-2 focus:border-bluPadelHub block w-full p-2.5"
                autocomplete="off" v-model="passwd" @keyup="validateInput" @blue="validateInput" @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)">
        </div>
        <div class="text-redBusy" v-if="errors.password">
            {{ errors.password }}
        </div>
        <div>
            <label ref="confirm-password" for="CampoConfermaPassword" class="block mb-2 text-sm font-medium">Reinserisci la password:</label>
            <input type="password" name="conferma-password"
                class="border border-graySlate sm:text-sm rounded-lg focus:ring-2 focus:border-bluPadelHub block w-full p-2.5"
                autocomplete="off" v-model="confPasswd" @keyup="confirmPassword" @blue="confirmPassword">
        </div>
        <div class="text-redBusy" v-if="errors.confPassword">
            {{ errors.confPassword }} 
        </div>
    </div>
</template>

<script setup lang="ts">
import { validatePasswordField, errors, validateConfirmPasswordField } from "@/modules/formValidation";
import { ref, computed } from "vue";
let passwd = ref<string | null>(null);
let confPasswd = ref<string | null>(null);

const validateInput = () => {
    validatePasswordField("password", passwd.value);
};

const confirmPassword = () => {
    validateConfirmPasswordField("confPassword", confPasswd.value, passwd.value);
}

</script>
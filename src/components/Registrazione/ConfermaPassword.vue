<template>
    <div class="field">
        <div>
            <label ref="confirm-password" for="CampoConfermaPassword" class="block mb-2 text-sm font-medium">Reinserisci la password:</label>
            <input type="password" name="conferma-password"
                class="border border-graySlate sm:text-sm rounded-lg focus:ring-2 focus:border-bluPadelHub block w-full p-2.5"
                autocomplete="off" v-model="confPasswd" @keyup="confirmPassword" @blue="confirmPassword" @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)">
        </div>
        <div class="text-redBusy" v-if="errors.confPassword">
            {{ errors.confPassword }} 
        </div>
    </div>
</template>

<script setup lang="ts">
import { validatePasswordField, errors, validateConfirmPasswordField } from "@/modules/formValidation";
import { ref, computed, getCurrentInstance, inject } from "vue";
let confPasswd = ref<string | null>(null);
const pwd = inject('userData')
const confirmPassword = () => {
    validateConfirmPasswordField("confPassword", confPasswd.value, (<any>pwd).password as string);
}

</script>
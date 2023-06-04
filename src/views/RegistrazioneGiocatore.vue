<template>
    <section class="bg-bluPadelHub h-screen">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8" v-if="toSubmit">
                    <h1 class="text-xl font-bold leading-tight tracking-tight">
                        Sei un Giocatore? Registrati qui
                    </h1>
                    <form @submit.prevent novalidate class="space-y-4 md:space-y-6" action="#">
                        <CampoNome v-model="user.name" />
                        <CampoEmail v-model="user.email" />
                        <CampoTelefono v-model="user.telefono" />
                        <CampoPassword v-model="user.password"/>
                        <ConfermaPassword v-model="user.confPassword"/>
                        <button type="submit"
                            class="w-full text-white bg-bluPadelHub hover:bg-bluPadelHubHover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-graySlate"
                            @click="singupButtonPressed" :disabled="isSignupButtonDisabled">Crea Account</button>
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Hai già un account? <a href="#"
                                class="font-medium text-primary-600 hover:underline dark:text-primary-500">Fai il login
                                qui</a>
                        </p>
                    </form>
                </div>
                <span v-else-if="responseError" class="text-invalidForm">{{ msg.error }}</span>
                <div v-else class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight">Ti è stata inviata una email con il link per
                        confermare l'account.<br />Clicca sul link per confermare l'account</h1>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import CampoNome from "@/components/Registrazione/CampoNome.vue";
import CampoEmail from "@/components/Registrazione/CampoEmail.vue";
import CampoPassword from "@/components/Registrazione/CampoPassword.vue";
import CampoTelefono from "@/components/Registrazione/CampoTelefono.vue";
import ConfermaPassword from "@/components/Registrazione/ConfermaPassword.vue";
import { errors } from "@/modules/formValidation";
import useSubmitButtonState from "@/modules/submitButtonState"
import axios from 'axios';
import { TipoAccount } from '@/store/auth';
import { provide, reactive, ref } from "vue";
import { validateConfirmPasswordField } from "@/modules/formValidation";
import type ConfermaPasswordVue from "@/components/Registrazione/ConfermaPassword.vue";

let toSubmit = ref(true);
let responseError: string;
let user = reactive({
    name: "",
    email: "",
    telefono: "",
    password: "",
    confPassword: ""
});

provide('userData', user) //per passarla al componente ConfermaPassword

function singupButtonPressed() {
    toSubmit.value = false;

    if (!axios) return

    axios.post(
        `${import.meta.env.VITE_BACK_URL}/api/v1/giocatore/registrazioneGiocatore`,
        {
            nome: user.name,
            email: user.email,
            telefono: user.telefono,
            password: user.password
        }
    ).then(response => {

        console.log(response)

        const { HTTPCode, success, message } = response.data.payload;

    }).catch(err => {
        const { message } = err.response.data;
        responseError = message
    })

}
const { isSignupButtonDisabled } = useSubmitButtonState(user, errors);


</script>

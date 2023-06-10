<template>
    <section class="bg-bluPadelHub h-screen">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8" v-if="toSubmit">
                    <h1 class="text-xl font-bold leading-tight tracking-tight">
                        Sei un Giocatore? Registrati qui
                    </h1>
                    <form @submit.prevent novalidate class="space-y-4 md:space-y-6" action="#">
                        <CampoNome v-model="user.cognome" :placeholder="'Inserisci cognome'" :label="'Cognome'" />
                        <CampoEmail v-model="user.email" />
                        <CampoNome v-model="user.nickname" :placeholder="'Inserisci nickname'" :label="'Nickname'" />
                        <CampoPassword v-model="user.password"/>
                        <ConfermaPassword v-model="user.confPassword"/>
                            <!-- Data di nascita -->
                            <!-- Genere -->
                        <input
                            class='' type="range" :value="user.livello" min="500" max="4500" step="1000">

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


enum Genere {
     Maschio,
     Femmina
}

type Utente = {
    nome: string,
    cognome: string,
    email: string,
    nickname: string,
    password: string,
    dataDiNascita: Date, // E un date
    genere: Genere,
    livello: number,
    foto: string, // È una stringa in base64
    tagTelegram: string,
    confPassword: string,
}

let toSubmit = ref(true);
let responseError: string;
let user: Utente = reactive({
    nome: "",
    cognome: "",
    email: "",
    nickname: "",
    password: "",
    dataDiNascita: null, // E un date
    genere: Genere,
    livello: 0,
    foto: "", // È una stringa in base64
    tagTelegram: "",
    confPassword: "",
}) as Utente;

provide('userData', user) //per passarla al componente ConfermaPassword

function singupButtonPressed() {

     console.log( user.livello )

    // toSubmit.value = false;
    //
    // if (!axios) return
    //
    // axios.post(
    //     `${import.meta.env.VITE_BACK_URL}/api/v1/giocatore/registrazioneGiocatore`,
    //     {
    //         nome: user.nome,
    //         cognome: user.cognome,
    //         email: user.email,
    //         nickname: user.nickname,
    //         password: user.password,
    //         dataDiNascita: user.dataDiNascita, // E un date
    //         genere: user.genere,
    //         livello: user.livello,
    //         foto: user.foto, // È una stringa in base64
    //         tagTelegram: user.tagTelegram,
    //     } as Utente
    // ).then(response => {
    //
    //     console.log(response)
    //
    //     const { HTTPCode, success, message } = response.data.payload;
    //
    // }).catch(err => {
    //     const { message } = err.response.data;
    //     responseError = message
    // })
    //
}
const { isSignupButtonDisabled } = useSubmitButtonState(user, errors);


</script>

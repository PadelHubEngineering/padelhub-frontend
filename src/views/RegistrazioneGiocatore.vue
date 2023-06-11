<template>
    <section class="bg-bluPadelHub h-auto">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
            <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8" v-if="toSubmit">
                    <h1 class="text-xl font-bold leading-tight tracking-tight">
                        Sei un Giocatore? Registrati qui
                    </h1>
                    <form @submit.prevent novalidate class="space-y-4 md:space-y-6" action="#">
                        <div class="grid grid-cols-1 gap-5">
                            <CampoNome nome-campo="nome" v-model="user.nome" :label="'Nome'" />
                            <CampoNome nome-campo="cognome" v-model="user.cognome" :placeholder="'Inserisci cognome'"
                                :label="'Cognome'" />
                            <CampoEmail v-model="user.email" />
                            <CampoNome nome-campo="nickname" v-model="user.nickname" :placeholder="'Inserisci nickname'"
                                :label="'Nickname'" />
                            <CampoTelefono v-model="user.telefono"></CampoTelefono>
                            <label class="block mb-2 text-sm font-medium"> Data di Nascita </label>
                            <DataPicker class="align-middle" v-model="user.dataDiNascita"> </DataPicker>
                            <label class="block mb-2 text-sm font-medium"> Sesso </label>
                            <div class="grid grid-class-3">
                                <div class="grid grid-cols-2" v-for="genere in Genere">
                                    <input type="radio" v-model="user.genere" :value="genere" />
                                    <label>{{ genere }} </label>
                                </div>
                            </div>
                            <div class="grid grid-cols-3">
                                <label class="block mb-2 text-sm font-medium col-span-3"> Livello di gioco </label>
                                <input class='col-span-3' type="range" v-model="user.livello" min="500" max="4500"
                                    step="1000">
                                <label for="">Basso</label>
                                <label for="" class="text-center">Medio</label>
                                <label for="" class="text-right">Alto</label>

                            </div>

                            <Input v-model="user.tagTelegram" type="text" placeholder="Inserisci il tuo tag telegram"
                                label="Tag Telegram"></Input>
                            <CampoPassword v-model="user.password" />
                            <ConfermaPassword v-model="user.confPassword" />
                            <button type="submit"
                                class="w-full text-white bg-bluPadelHub hover:bg-bluPadelHubHover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-graySlate"
                                @click="singupButtonPressed">Crea Account</button>
                            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                Hai già un account? <a href="#"
                                    class="font-medium text-primary-600 hover:underline dark:text-primary-500">Fai il login
                                    qui</a>
                            </p>
                        </div>
                    </form>
                </div>
                <span v-else-if="responseError" class="text-invalidForm">{{ msg.error }}</span>
                <div v-else class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight">Ti è stata inviata una email con il link per
                        confermare l'account.<br />Clicca sul link per confermare l'account</h1>
                </div>
            </div>
        </div>
        <Modal size="xs" v-if="isShowModal" @close="closeModal">
            <template #header>
                <div class="flex items-center text-lg">
                    Inserimento dati non valido
                </div>
            </template>
            <template #body>

                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    {{ statusMessage }}
                </p>
            </template>
            <template #footer>
                <div class="flex justify-between">
                    <button @click="closeModal" type="button"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Chiudi
                    </button>
                </div>
            </template>
        </Modal>
    </section>
</template>

<script setup lang="ts">
import CampoNome from "@/components/Registrazione/CampoNome.vue";
import CampoEmail from "@/components/Registrazione/CampoEmail.vue";
import CampoPassword from "@/components/Registrazione/CampoPassword.vue";
import CampoTelefono from "@/components/Registrazione/CampoTelefono.vue";
import ConfermaPassword from "@/components/Registrazione/ConfermaPassword.vue";
import { errors } from "@/modules/formValidation";
import { useSubmitButtonState, useSubmitButtonStateGiocatore } from "@/modules/submitButtonState"
import axios from 'axios';
import { TipoAccount } from '@/store/auth';
import { provide, reactive, ref } from "vue";
import { validateConfirmPasswordField } from "@/modules/formValidation";
import type ConfermaPasswordVue from "@/components/Registrazione/ConfermaPassword.vue";
import DataPicker from "@/components/DataPicker.vue";
import { Dropdown, ListGroup, ListGroupItem, Input, Modal } from 'flowbite-vue'
import { Genere, type Utente } from "@/modules/types";

//campi obbligatori
const toCheck = ["nome", "cognome", "email", "nickname", "password", "confPassword", "livello", "telefono"]


let date = ref(new Date());
let toSubmit = ref(true);
let responseError = ref(null);
let user = reactive<Utente>({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    nickname: "",
    password: "",
    dataDiNascita: new Date(), // E un date
    genere: Genere.Altro,
    livello: 500,
    foto: "", // È una stringa in base64
    tagTelegram: "",
    confPassword: "",
});


//Modal section
let isShowModal = ref(false)
let statusMessage = ref("")

provide('userData', user) //per passarla al componente ConfermaPassword

function singupButtonPressed() {
    console.log(user)
    let validInput = () => {
        let count = 0;
        for (const key of Object.keys(user)) {
            if (toCheck.includes(key)) {
                if (user[key as keyof Utente] != "") {
                    count++
                }
            }
        }
        let countEr = 0;
        for(const key in Object.keys(errors)){
            if(errors[key] == "" || errors[key] == undefined)
                countEr++
        }
        if (count == toCheck.length && countEr == Object.keys(errors).length)
            return true
        return false
    };

    console.log(errors)

    if (validInput()) {
        axios.post(
            `${import.meta.env.VITE_BACK_URL}/api/v1/giocatore`,
            {
                nome: user.nome,
                cognome: user.cognome,
                email: user.email,
                nickname: user.nickname,
                password: user.password,
                telefono: user.telefono,
                dataDiNascita: user.dataDiNascita, // E un date
                genere: user.genere,
                livello: parseInt(user.livello.toString()),
                tagTelegram: user.tagTelegram,
                foto: ""
            } as Utente
        ).then(response => {
            toSubmit.value = false;   
            console.log(response)
            const { HTTPCode, success, message } = response.data.payload;
        }).catch(err => {
            console.log(err)
            const { message } = err.response.data;
            responseError = message
            statusMessage = message
            isShowModal.value = true
        })
    }
    else {
        statusMessage.value =  "Inserisci prima tutti i campi  " + toCheck
        isShowModal.value = true
    }
}

function closeModal(){
    isShowModal.value = false
}

</script>

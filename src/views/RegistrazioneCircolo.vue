<template>
<section class="bg-bluPadelHub h-screen">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight">
                  Sei un circolo? Registra qui la tua struttura
              </h1>
              <form @submit.prevent novalidate class="space-y-4 md:space-y-6" action="#">
                <CampoNome v-model="user.name"/>
                <CampoEmail v-model="user.email"/>
                <CampoTelefono v-model="user.telefono" />
                <CampoPassword v-model="user.password"/>
                  <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" >
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">Accetto <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Termini e Condizioni</a></label>
                      </div>
                  </div>
                  <button type="submit"  class="w-full text-white bg-bluPadelHub hover:bg-bluPadelHubHover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:bg-graySlate" @click="singupButtonPressed" :disabled="isSignupButtonDisabled">Crea Account</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Hai già un account? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Fai il login qui</a>
                  </p>
              </form>
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
import { errors } from "@/modules/formValidation";
import useSubmitButtonState from "@/modules/submitButtonState"
import { reactive } from "vue";
let user = reactive({
      name: "",
      email: "",
      telefono: "",
      password: "",
    });
function singupButtonPressed(){
    console.log(user);
}
const { isSignupButtonDisabled } = useSubmitButtonState(user, errors);

</script>

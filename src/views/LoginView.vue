<script setup lang='ts'>
  import { TipoAccount, useAuthUserStore } from '@/stores/authStore';
import { reactive, ref } from 'vue';
    import { useRouter } from "vue-router"
    import axios, { AxiosError } from "axios"
import MobileHeader from '@/components/MobileHeader.vue';

    const router = useRouter();
    const authUserStore = useAuthUserStore()

    const msg = reactive({
        email: "",
        password: "",
        error: ""
    })
    const disabled: Array<boolean>= reactive([ false, false ])

    const email = ref("")
    const password = ref("")

    function validateEmail(value: any) {
        if (new RegExp("^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$", "v").test(value)) { //Se rispetta il form
            msg.email = '';
            disabled[0] = false
        } else {
            msg.email = 'Email non valida';
            disabled[0] = true
        }

    }
    function validatePassword(value: any) {

        if (new RegExp("^[[A-Za-z\d@$!%*?&]{1,30}$", "v").test(value)) { //Se rispetta il regex
            msg.password = '';
            disabled[1] = false

        } else {
            msg.password = 'Password non valida';
            disabled[1] =  true
        }

    }
    function handleSubmission() {
        alert(`Email: ${email} Password: ${password}`)
    }
    async function login() {

        let response = null;

        try{
            response = await axios.post(
                `${import.meta.env.VITE_BACK_URL}/api/v1/authentication`,
                {
                    email: email.value,
                    password: password.value
                }
            )
        } catch(err) {
            let act_err = err as AxiosError
            const data: any = act_err.response?.data;

            if( act_err.response )
              msg.error = data.message;
            else
              msg.error = "Login fallito: Riprova più tardi";
        }

        if( response != null ) {


            console.log(response)

            const { success } = response.data;

            const { token, dati } = response.data.payload;
            const { email, nome, tipoAccount } = dati;

            //Memorizzo lo stato nello store per avere in seguito i dati che mi servono
            authUserStore.authenticated = success;
            authUserStore.email = email;
            authUserStore.nome = nome;
            authUserStore.tipoAccount = tipoAccount;
            authUserStore.token = token;

            if (tipoAccount == TipoAccount.Giocatore) { //E' un giocatore
                router.push({ name: "DashboardGiocatore" })
            } else if (tipoAccount == TipoAccount.Circolo) { //E' un circolo
                router.push({ name: "DashboardCircolo" })
            }
        }
    }

</script>

<template>
    <MobileHeader/>
<div class="flex justify-center items-center place-items-center"> 

  <div id="visa" class="place-items-center bg-white shadow-lg max-w-lg mt-10 rounded-[12px] w-4/5">
    <h1 class="text-white bg-bluPadelHub font-bold text-xl text-center py-5  rounded-[12px] font-circolo">LOGIN</h1>
    <br><br>
    <form @submit.prevent="handleSubmission" class="px-5   pt-6 mb-4">
      <label for="email" class="font-bold font-circolo text-bluPadelHub">La tua email</label>
      <input
        type="text"
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}"
        class="invalid:border-invalidForm  invalid:text-invalidForm 
               focus:invalid:border-invalidForm  focus:invalid:ring-invalidForm placeholder:italic border-bluPadelHub shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        v-model="email" required>

      <br>
      <span
          v-if="msg.email"
          class="italic text-xs"
      >{{ msg.email }}</span>

      <br>
      <label for="password" class="font-bold font-circolo text-bluPadelHub">Password</label>
      <input type="password" pattern="[A-Za-z\d@$!%*?&]{1,30}"
        class="border-bluPadelHub invalid:border-invalidForm  invalid:text-invalidForm 
               focus:invalid:border-invalidForm  focus:invalid:ring-invalidForm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:italic"
        v-model="password" required><br>
      <span v-if="msg.password" class="italic text-xs text-center">{{ msg.password }}</span>
      <br>
      <span v-if="msg.error" class="text-invalidForm text-center">{{ msg.error }}</span>
      <br><br>
      <input
        class="shadow bg-bluPadelHub enabled:hover:bg-bluPadelHubHover text-white font-circolo font-bold py-3 w-full rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit" :disabled="!disabled.every((i: any) => i === false)" v-on:click.prevent="login()" /> 
    </form>
    <div class="flex flex-col space-y-3 mt-10 bg-bluPadelHub p-5 rounded-[12px] px-4 flex justify-center items-center">
        <p class="text-center text-white mb-4 font-circolo">Non sei ancora registrato?</p>
        <router-link :to="{ name: 'RegistrazioneGiocatore'}"><button class="text-bluPadelHub bg-white rounded-[12px] p-2 px-10 shadow-lg font-bold font-circolo">Registrati come GIOCATORE</button></router-link>
        <router-link :to="{ name: 'RegistrazioneCircolo'}"><button class="text-bluPadelHub bg-white rounded-[12px] p-2 px-10 shadow-lg font-bold font-circolo">Registrati come CIRCOLO</button></router-link>
     </div>
  </div>
</div>    

</template>



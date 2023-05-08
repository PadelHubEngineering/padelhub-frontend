<template>
  <div id="visa">
    <h1 class="text-bluPadelHub font-bold text-xl text-center">Login</h1>
    <br><br>
    <form @submit.prevent="handleSubmission" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <label for="email" class="font-bold text-bluPadelHub">La tua email</label>
      <input type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}"    
        class="invalid:border-invalidForm  invalid:text-invalidForm 
         focus:invalid:border-invalidForm  focus:invalid:ring-invalidForm placeholder:italic border-bluPadelHub shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        v-model="email" required> <br>
      <span v-if="msg.email" class="italic text-xs">{{ msg.email }}</span>
      <br>
      <label for="password" class="font-bold text-bluPadelHub">Password</label>
      <input type="password" pattern="[A-Za-z\d@$!%*?&]{1,30}"
        class="border-bluPadelHub invalid:border-invalidForm  invalid:text-invalidForm 
         focus:invalid:border-invalidForm  focus:invalid:ring-invalidForm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:italic"
        v-model="password" required><br>
      <span v-if="msg.password" class="italic text-xs">{{ msg.password }}</span>
      <br>
      <span v-if="msg.error" class="text-invalidForm">{{ msg.error }}</span>
      <br><br>
      <input
        class="shadow bg-bluPadelHub enabled:hover:bg-bluPadelHubHover text-white font-bold py-3 w-full rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit" :disabled="!disabled.every((i: any) => i === false)" v-on:click.prevent="login()" />
    </form>
  </div>
</template>



<script lang="ts">

import { TipoAccount } from '@/store/auth';
import axios from 'axios';
import { createApp, inject } from 'vue';

export default {
  name: 'LoginView',
  data() {
    return {
      email: "",
      password: "",
      output: "",
      disabled: [true, true],
      msg: {
        email: '',
        password: '',
        error: ''
      },
    }
  },
  watch: {
    email(value) {
      this.validateEmail(value);
    },
    password(value) {
      this.validatePassword(value);
    }
  },
  methods: {
    validateEmail(value: any) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) { //Se rispetta il form
        this.msg['email'] = '';
        this.disabled = [false, this.disabled[1]]
      } else {
        this.msg['email'] = 'Email non valida';
        this.disabled = [true, this.disabled[1]]
      }

    },
    validatePassword(value: any) {

      if (/^[[A-Za-z\d@$!%*?&]{1,30}$/.test(value)) { //Se rispetta il regex 
        this.msg['password'] = '';
        this.disabled = [this.disabled[0], false]

      } else {
        this.msg['password'] = 'Password non valida';
        this.disabled = [this.disabled[0], true]
      }

    },
    handleSubmission() {
      alert(`Email: ${this.email} Password: ${this.password}`)
    },
    login() {

      //const axios: Axios | undefined = this.$axios as Axios;
      if (!axios) return

      axios.post(
        `${import.meta.env.VITE_BACK_URL}/api/v1/authentication`,
         {
          email: this.email,
          password: this.password
         }
      ).then(response => {

        console.log(response)

        const { success, message, token, dati } = response.data;
        const { email, nome, tipoAccount } = dati;

      
        //Memorizzo lo stato nello store per avere in seguito i dati che mi servono
        this.$store.commit(`auth/setAuthenticated`, success)
        this.$store.commit(`auth/setEmail`, email)
        this.$store.commit(`auth/setNome`, nome)
        this.$store.commit(`auth/setTipoAccount`, tipoAccount)
        this.$store.commit(`auth/setToken`, token)


        if (tipoAccount == TipoAccount.Gicocatore) { //E' un giocatore
          this.$router.push('/dashGiocatore')
        }
        else if (tipoAccount == TipoAccount.Circolo) { //E' un circolo
          this.$router.push('/dashCircolo')
        }


      }).catch( err => {
        const { message } = err.response.data;
        this.msg['error'] = message
      })

    },
  }
}

</script>



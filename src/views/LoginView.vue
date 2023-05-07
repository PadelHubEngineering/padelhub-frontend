<script lang="ts">

import type { TipoAccount } from '@/store/auth';
import { Axios } from 'axios';
import { inject } from 'vue'; 

export default {
    name: 'LoginView',
    data(){
        return{
            input: {
                email: "",
                password: ""
            },
            output: "",
        }
    },
    inject: ['$axios'],
    methods:{
        login(){

            const axios: Axios | undefined = this.$axios as Axios;
            if( !axios ) return 

            axios.post(
                "http://192.168.1.18:9090/api/v1/authentication", 
                this.input
            ).then( response => {

                console.log(response)

                const { success, message, token, dati } = response.data;
                const { email, nome, tipoAccount } = dati;

                //Memorizzo lo stato nello store per avere in seguito i dati che mi servono
                this.$store.commit(`auth/setAuthenticated`, success)
                this.$store.commit(`auth/setEmail`, email)
                this.$store.commit(`auth/setNome`, nome)
                this.$store.commit(`auth/setTipoAccount`, tipoAccount)
                this.$store.commit(`auth/setToken`, token)

                console.log(this.$store.state.auth)

                if(tipoAccount == 0){ //E' un giocatore
                    this.$router.push('/dashGiocatore')
                } 
                else if(tipoAccount == 1) { //E' un circolo
                    this.$router.push('/dashCircolo')
                }
                

            }).catch (err => {
                console.log(err)
                this.output = "Email o password errata"
            }
            )

        },

        validateEmail(){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.input.email)) {
                this.output = "Valida"
            } else {
                this.output = "Inserisci un'email valida"
            }
        },

        validatePassword(){
            if(this.input.password == ''){
                this.output = "Inserire la password"
            }
        },

        check(){

        }


    }
}

</script>


<template>

    <div class="h-screen flex flex-col items-center justify-center">
        <img src="/img/logoPadelHub.png" width="150" height="150">
        <br><br><br><br>
         <form name="login-form">
            <div>
                <label for="email" class="font-bold text-bluPadelHub">La tua email</label>
                <input id="email" type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" v-model="input.email" required class="invalid:border-invalidForm  invalid:text-invalidForm 
      focus:invalid:border-invalidForm  focus:invalid:ring-invalidForm placeholder:italic border-bluPadelHub shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email"/>
            </div>
            <br>
            <div>
                <label for="password" class="font-bold text-bluPadelHub">Password</label>
                <input id="password" type="password" pattern=".{8,}" v-model="input.password" class="border-bluPadelHub invalid:border-invalidForm  invalid:text-invalidForm 
      focus:invalid:border-invalidForm  focus:invalid:ring-invalidForm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:italic" required placeholder="********">
            </div>
            <br><br>
            <button class="shadow bg-bluPadelHub enabled:hover:bg-bluPadelHubHover text-white font-bold py-3 w-full rounded-[12px] disabled:opacity-50 disabled:cursor-not-allowed" type="submit" v-on:click.prevent = "login()">Login</button>
        </form>
        <br>
         <p>{{ output }}</p>  
    </div>

</template>



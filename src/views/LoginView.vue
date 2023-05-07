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

                //console.log(response)

                const { success, message, token, dati } = response.data;
                const { email, nome, tipoAccount } = dati;

                //Memorizzo lo stato nello store per avere in seguito i dati che mi servono
                this.$store.commit(`auth/setAuthenticated`, success)
                this.$store.commit(`auth/setEmail`, email)
                this.$store.commit(`auth/setNome`, nome)
                this.$store.commit(`auth/setTipoAccount`, tipoAccount)
                this.$store.commit(`auth/setToken`, token)

                //console.log(this.$store.state.auth)

                this.$router.push('/dashboard')

            }).catch (err => console.log(err))

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
        }


    }
}

</script>

<template>
    <div >
        <form name="login-form" class="justify-center" flex flex-col items-center justify-center >
            <div>
                <label for="email" class="font-bold text-bluPadelHub">La tua email</label>
                <input id="email" type="text" v-model="input.email" v-on:focusout="validateEmail" required class=" placeholder:italic border-bluPadelHub shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email"/>
            </div>
            <br>
            <div>
                <label for="password" class="font-bold text-bluPadelHub">Password</label>
                <input id="password" type="password" v-model="input.password"  v-on:focusout="validatePassword" class="border-bluPadelHub shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:italic" required placeholder="********">
            </div>
            <br><br>
            <button class="shadow bg-bluPadelHub hover:bg-bluPadelHubHover text-white font-bold py-3 w-full rounded-[12px]" type="submit" v-on:click.prevent = "login()">Login</button>
        </form>
        <br>
        <p>{{ output }}</p>  
    </div>

</template>



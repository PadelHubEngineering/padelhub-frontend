<script lang="ts">

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
    methods:{
        login(){

            this.output = "Mando i dati al backend"
            // if(this.input.password != ""){
            //     console.log("Autenticato")
            //     this.$store.commit(`auth/setAuthenticated`, true);
            //     this.$store.commit(`auth/setUsername`, this.input.email);
            //     this.output = "Autenticato con successo"
            //     console.log(this.$store.state.auth.username)
            //     this.$router.push('/dashboard')
            // } else {
            //     this.$store.commit(`auth/setAuthenticated`, false);
            //     this.output = ""
            // }
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
    <form name="login-form" >
        <div>
            <label for="email">Email: </label>
            <input id="email" type="text" v-model="input.email" v-on:focusout="validateEmail" required />
        </div>
        <div>
            <label for="password">Password: </label>
            <input id="password" type="password" v-model="input.password"  v-on:focusout="validatePassword" required/>
        </div>
        <button type="submit" v-on:click.prevent = "login()">Login</button>
    </form>

    <p>{{ output }}</p>  

</template>



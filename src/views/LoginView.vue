<template>
    <form name="login-form" >
        <div>
            <label for="email">Email: </label>
            <input id="email" type="text" v-model="input.email" />
        </div>
        <div>
            <label for="password">Password: </label>
            <input id="password" type="password" v-model="input.password"/>
        </div>
        <button type="submit" v-on:click.prevent = "login()" >Login</button>
    </form>

    <p>{{ output }}</p>
</template>

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
            if(this.input.email != "" && this.input.password != ""){
                console.log("Autenticato")
                this.$store.commit(`auth/setAuthenticated`, true);
                this.$store.commit(`auth/setUsername`, this.input.email);
                this.output = "Autenticato con successo"
                console.log(this.$store.state.auth.username)
                this.$router.push('/dashboard')
            } else {
                this.$store.commit(`auth/setAuthenticated`, false);
                this.output = "Autenticazione fallita"
            }
        }
    }
}
</script>
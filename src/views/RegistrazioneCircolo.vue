
<template>
    <section class="signup-view" @submit.prevent>
        <form class="ui form">
            <CampoNome />
            <CampoEmail />
            <CampoTelefono />
            <CampoPassword />
            <button class="ui button red fluid big">
                SIGN UP
            </button>
        </form>
    </section>
</template>

<script setup lang="ts">
import CampoNome from "@/components/Registrazione/CampoNome.vue";
import CampoEmail from "@/components/Registrazione/CampoEmail.vue";
import CampoTelefono from "@/components/Registrazione/CampoTelefono.vue";
import CampoPassword from "@/components/Registrazione/CampoPassword.vue";
</script>

<script setup lang="ts">
import {TipoCampo} from "./TipoCampo.types"
import {computed} from 'vue'

const campoButton = "campi";

const props = defineProps(['tipo']);

const tipoCampoMessage = computed(()=> {
    return props.tipo === TipoCampo.Esterno ? 'ESTERNI' : 'INTERNI'
})

</script>


<template>

    <button class="text-white bg-bluPadelHub font-circolo p-3 rounded-lg w-full my-3 shadow-lg"> {{campoButton}} {{tipoCampoMessage}} </button>

</template>



<script setup lang="ts">
    import StructureIcon from "@/components/icons/StructureIcon.vue"
</script>


<template>
    <div class='border-arancio border-2 bg-arancio m-4 px-4 py-2 rounded-2xl flex items-center'>
        <StructureIcon class='w-10 h-10 mr-4'/>

        <span class='block text-white text-lg'>Attenzione! Il circolo non è validato. Questo significa che non è visibile ai giocatori. Per rendere visibile il tuo circolo, inserisci i dati cliccando
            <router-link to="/AreaCircolo">Qui</router-link>
        </span>

    </div>
</template>

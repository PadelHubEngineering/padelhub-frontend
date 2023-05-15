<template>
    
    <!-- Caso in cui lo slot è disponibile -->
    <button v-on:click='emitClick' type="button" v-if="color === 'Green'" class = "bg-greenFree border-2 border-bluPadelHub rounded-lg px-12 py-10 text-bluPadelHub"></button>
 
    <!-- Caso in cui lo slot è riservato dal circolo -->
    <button v-on:click='emitClick' type="button" v-else-if="color === 'Yellow'"  class = "bg-yellowReserved border-2 border-bluPadelHub rounded-lg px-12 py-10 text-bluPadelHub"></button>
    
    <!-- Caso in cui lo slot è occupato da una partita -->
    <button v-on:click='emitClick' type="button" v-else="color === 'Red'" class = "bg-redBusy border-2 border-bluPadelHub rounded-lg px-12 py-10 text-bluPadelHub"></button>

</template>


<script lang="ts">

    export enum Color {
        Green = "Green",
        Yellow = "Yellow",
        Red = "Red"
    }

    export default {
        name: "ItemSlot",
        data() {
            return {}
        },
        props: ['color', 'inizio', 'fine', 'partita'],
        emits: ['click'],
        methods:{
            emitClick() {
                this.$emit("click")
            }
        }
    }
</script>

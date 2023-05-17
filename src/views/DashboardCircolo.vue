<script setup lang="ts">
    import ItemSlot from "@/components/GestioneSlot/ItemSlot.vue";
import CircoloMenuComponent from "../components/CircoloMenuItems/CircoloMenuComponent.vue"
import SlotGrid from "@/components/GestioneSlot/SlotGrid.vue";
import DataPicker from "@/components/DataPicker.vue";
import DataPickerVue from "@/components/DataPicker.vue";
import axios from "axios";

</script>


<template>
    <div class="flex h-screen w-screen">
        <CircoloMenuComponent  class='w-1/5 min-w-[300px]'/>

        <div class="w-4/5 max-w-4/5 ml-5 mt-5 overflow-x-auto">
            <DataPickerVue v-model="date"></DataPickerVue>
            <br><br>
            <SlotGrid></SlotGrid>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
    name: "DashboardCircolo",
    data() {
        return {
            date: new Date(),
            risposta: {}
        };
    },
    methods: {
        getUsername(): string {
            return this.$store.state.auth.nome;
        },


        sendBackRequest(){

            if (!axios) return

            axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/authentication`, //Impostare l'URL a cui collagarsi
                { date: this.date }

            ).then(response => {

                console.log(response)
                this.risposta = response

            }).catch( err => {
                const { message } = err.response.data;
                console.log(message)
            })
            

        }


    },
    component: [
        CircoloMenuComponent,
        SlotGrid,
        DataPickerVue
    ]
    
}
</script>

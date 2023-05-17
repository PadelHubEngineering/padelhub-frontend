<script setup lang="ts">
    import ItemSlot from "@/components/GestioneSlot/ItemSlot.vue";
import CircoloMenuComponent from "../components/CircoloMenuItems/CircoloMenuComponent.vue"
import SlotGrid from "@/components/GestioneSlot/SlotGrid.vue";
import DataPicker from "@/components/DataPicker.vue";
import DataPickerVue from "@/components/DataPicker.vue";

</script>


<template>
    <div class="flex h-screen w-screen overflow-x-auto">
        <CircoloMenuComponent
            class='w-1/5'
        />

        <div class="w-4/5 ml-5 mt-5 overflow-x-auto">
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
            date: new Date()
        };
    },
    methods: {
        getUsername(): string {
            return this.$store.state.auth.nome;
        }
    },
    component: [
        CircoloMenuComponent,
        SlotGrid,
        DataPickerVue
    ]
    
}
</script>

<script setup lang="ts">
    import ItemSlot from "@/components/GestioneSlot/ItemSlot.vue";
import CircoloMenuComponent from "../components/CircoloMenuItems/CircoloMenuComponent.vue"
import SlotColumn from "@/components/GestioneSlot/SlotColumn.vue";
import SlotGrid from "@/components/GestioneSlot/SlotGrid.vue";

</script>


<template>
    <div class="flex h-screen w-screen">
        <CircoloMenuComponent
            class='w-1/5'
        />

        <div class="w-4/5">
            <h3>Welcome Circolo {{ getUsername() }}</h3>
            <SlotGrid></SlotGrid>
        </div>
    </div>
</template>

<script lang="ts">
    export default {
    name: "DashboardCircolo",
    data() {
        return {};
    },
    methods: {
        getUsername(): string {
            return this.$store.state.auth.nome;
        }
    },
    component: [
        CircoloMenuComponent,
        SlotGrid
    ]
}
</script>

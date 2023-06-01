
<script setup lang='ts'>

    import { ref, type Ref } from "vue";
    import ListaPartiteSlot from "../components/partite/ListaPartiteSlot.vue"
    import { useRoute } from "vue-router";


    const route = useRoute()
    const { circolo, year, month, day, hour, minutes } = route.params;

    const data: Ref<Date | undefined> = ref(undefined)
    const circoloId: Ref<string | undefined> = ref("")

    if(
        !( circolo instanceof Array ) &&
        !( year instanceof Array ) &&
        !( month instanceof Array ) &&
        !( day instanceof Array ) &&
        !( hour instanceof Array ) &&
        !( minutes instanceof Array )
    ) {
        data.value = new Date(
            parseInt(year),
            parseInt(month),
            parseInt(day),
            parseInt(hour),
            parseInt(minutes),
            0
        )

        circoloId.value = circolo
    }
</script>

<template>

    <ListaPartiteSlot :circolo="circoloId" :data="data" ></ListaPartiteSlot>
</template>

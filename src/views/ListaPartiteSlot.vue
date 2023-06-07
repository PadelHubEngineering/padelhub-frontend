
<script setup lang='ts'>

    import { computed, onMounted, ref, type Ref } from "vue";
    import ListaPartiteSlot from "../components/partite/ListaPartiteSlot.vue"
    import PartitaHeader from "../components/partite/PartitaHeader.vue"
    import { useRoute } from "vue-router";
    import MobileHeader from "@/components/MobileHeader.vue"
    import type { CircoloRetI, PartitaRetI, PartiteAperteI } from "@/components/partite/Partita.types";
    import axios from "axios";
import { useAuthUserStore } from "@/stores/authStore";


    const route = useRoute()
    const authUserStore = useAuthUserStore()

    const { circolo, year, month, day, hour, minutes } = route.params;

    const partite: Ref<PartitaRetI[]> = ref([]);
    const giaPrenotato: Ref<boolean> = ref(false);
    const isIscritto = ref(false)
    const datiCircolo: Ref<CircoloRetI | undefined> = ref(undefined)

    async function loadPartiteSlot() {
        let response;

        if(
            !( typeof(circolo) === "string" ) ||
            !( typeof(year) === "string" ) ||
            !( typeof(month) === "string" ) ||
            !( typeof(day) === "string" ) ||
            !( typeof(hour) === "string" ) ||
            !( typeof(minutes) === "string" ) ||
            isNaN(parseInt(circolo))
        )
            return



        console.log("sto cercando di scaricare le partite")

        const data_api = [
            year.padStart(4, "0"),
            month.padStart(2, "0"),
            day.padStart(2, "0"),
            hour.padStart(2, "0"),
            minutes.padStart(2, "0"),
        ].join("-")

        console.log("la mia data api", data_api)

        try{
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/circolo/${circolo}/partiteAperte/${data_api}`,
                {
                    headers: {
                        'x-access-token': authUserStore.token
                    }
                }
            )
        } catch (error: any) {
            console.log("Impossibile scaricare partite " + error.response.data.status)
            return false;
        }

        console.log(response)

        if ( response === undefined || !response.data.success ){
            console.log("Impossibile scaricare partite " + ( response?.data.message || "Errore generico" ))
            return false;
        } else {
            const payload: PartiteAperteI = response.data.payload;

            partite.value = payload.partite;
            giaPrenotato.value = payload.giaPrenotato;
            isIscritto.value = payload.isAffiliato
            datiCircolo.value = payload.circolo
        }
    }

    onMounted(async () => {
        await loadPartiteSlot()
    })
</script>

<template>

    <MobileHeader :ready="true" title='Gioca'/>

    <PartitaHeader :iscritto="isIscritto" :nomeCircolo="datiCircolo?.nome"/>

    <hr />


    <ListaPartiteSlot :partite="partite"></ListaPartiteSlot>
</template>


<script setup lang='ts'>

    import { computed, onMounted, ref, type Ref } from "vue";
    import ListaPartiteSlot from "../components/partite/ListaPartiteSlot.vue"
    import PartitaHeader from "../components/partite/PartitaHeader.vue"
    import { useRoute, useRouter } from "vue-router";
    import MobileHeader from "@/components/MobileHeader.vue"
    import type { CircoloRetI, PartitaRetI, PartiteAperteI } from "@/components/partite/Partita.types";
    import axios from "axios";
import { useAuthUserStore } from "@/stores/authStore";
import { DateTime } from "luxon";
import { TipoCampo } from "@/components/RicercaCircoli/TipoCampo.types";


    const route = useRoute()
    const router = useRouter()
    const authUserStore = useAuthUserStore()

    const { circolo, year, month, day, hour, minutes } = route.params;

    const partite: Ref<PartitaRetI[]> = ref([]);
    const giaPrenotato: Ref<boolean> = ref(false);
    const isIscritto = ref(false)
    const datiCircolo: Ref<CircoloRetI | undefined> = ref(undefined)

    const tipoCampo = TipoCampo.Esterno;

    const data_attuale: Ref<DateTime | null> = ref( null )

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

        data_attuale.value = DateTime.fromObject({ year: parseInt( year ), month: parseInt( month ), day: parseInt( day ), hour: parseInt( hour ), minute: parseInt( minutes ) });

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

    <MobileHeader :ready="true" title='Gioca'>
        <template v-slot:leftSide>
            <img src='/img/indietro_white.png' v-on:click="router.go(-1)">
        </template>
        <template v-slot:rightSide>
            <img src='/img/logoPadelHub.png' v-on:click="router.push({ path: '/' })"/>
        </template>
    </MobileHeader>

    <PartitaHeader :iscritto="isIscritto" :nomeCircolo="datiCircolo?.nome"/>

    <hr />


    <div clas='mb-20 bg-bluPadelHub'>
        <ListaPartiteSlot :partite="partite"></ListaPartiteSlot>
    </div>

    <button
        v-on:click.prevent="router.push({ name: 'NuovaPartita', query: { dataOra: data_attuale?.toJSON() , tipoCampo: tipoCampo, idCircolo: datiCircolo?._id, nomeCircolo: datiCircolo?.nome } })"
        class='h-18 w-4/5 rounded-2xl bg-bluPadelHub px-4 py-3 text-3xl block bottom-3 absolute left-1/2 transform -translate-x-1/2 text-white'
    >
        Crea partita
    </button>
</template>

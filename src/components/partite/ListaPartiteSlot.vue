
<script setup lang="ts">
    import axios from 'axios';
    import { onMounted, ref, type Ref } from 'vue';
    import type { PartitaRetI, PartiteAperteI } from './Partita.types';
    import { useStore } from 'vuex';

    import PartitaListItem from "./PartitaListItem.vue"


    const store = useStore()

    const props = defineProps({
        data: { type: Date, required: false },
        circolo: { type: String, required: false }
    })

    const partite: Ref<PartitaRetI[]> = ref([]);
    const giaPrenotato: Ref<boolean> = ref(false);

    async function loadPartiteSlot() {
        let response;

        if( props.data === undefined  ) return;

        console.log("sto cercando di scaricare le partite")
        console.log("props.data", props.data)

        const data_api = [
            props.data.getFullYear().toString().padStart(4, "0"),
            props.data.getMonth().toString().padStart(2, "0"),
            props.data.getDate().toString().padStart(2, "0"),
            props.data.getHours().toString().padStart(2, "0"),
            props.data.getMinutes().toString().padStart(2, "0"),
        ].join("-")

        console.log("la mia data api", data_api)

        try{
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/circolo/${props.circolo}/partiteAperte/${data_api}`,
                {
                    headers: {
                        'x-access-token': store.state.auth.token
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

        }
    }

    onMounted(async () => {
        await loadPartiteSlot()
    })



</script>

<template>
    <div v-for="p in partite">
        <router-link :to='"/partita/" + p._id'>
            <PartitaListItem :partita="p" @on.click="" />
        </router-link>
    </div>
</template>

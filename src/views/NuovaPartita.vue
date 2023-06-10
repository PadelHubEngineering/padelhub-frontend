
<script setup lang='ts'>
    import { CircoloRetI, stampaCategorie } from '@/components/partite/Partita.types';
    import { useAuthUserStore } from '@/stores/authStore';
    import axios from 'axios';
    import { DateTime } from 'luxon';
    import { computed, onMounted, ref, type Ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    import MobileHeader from "@/components/MobileHeader.vue"
    import PartitaHeader from "@/components/partite/PartitaHeader.vue"
    import PartitaHeaderInfo from "@/components/partite/PartitaHeaderInfo.vue"



    const route = useRoute();
    const router = useRouter();
    const authUserStore = useAuthUserStore()


    const classeLabelCategoria = 'mt-4 mx-4 text-2xl block'
    const classeSliderCategoria = 'w-4/5 mx-auto block my-7 block'


    const dataOra: Ref<DateTime | null> = ref(null)
    const tipoCampo: Ref<string | null> = ref(null)
    const idCircolo: Ref<string | null> = ref(null)
    const nomeCircolo: Ref<string | null> = ref(null)

    const circolo: Ref<CircoloRetI | null> = ref( null )

    const categoria_min = ref(1)
    const categoria_max = ref(5)

    const getCategoriaString = computed( () => {
        console.log( stampaCategorie(categoria_min.value, categoria_max.value ) )
        return stampaCategorie(categoria_min.value, categoria_max.value )
    })

    onMounted( async () => {

        const _dataOra = route.query.dataOra;
        const _tipoCampo = route.query.tipoCampo;
        const _idCircolo = route.query.idCircolo;
        const _nomeCircolo = route.query.nomeCircolo;

        console.log( typeof _dataOra )
        console.log( typeof _tipoCampo )
        console.log( typeof _idCircolo )
        console.log( typeof _nomeCircolo )

        if(
            typeof _dataOra !== "string" ||
            typeof _tipoCampo !== "string" ||
            typeof _idCircolo !== "string" ||
            typeof _nomeCircolo !== "string"
        ) {
            return {}
        } else {
            dataOra.value = DateTime.fromISO( _dataOra )
            tipoCampo.value = _tipoCampo
            idCircolo.value = _idCircolo,
            nomeCircolo.value = _nomeCircolo
        }

        let response;
        try{
            response = await axios.get(
                `${import.meta.env.VITE_BACK_URL}/api/v1/circolo/${idCircolo.value}`,
                {
                    headers: {
                        'x-access-token': authUserStore.token
                    }
                }
            )
        } catch (error: any) {
            console.log("Impossibile scaricare dati circolo " + error.response.data.status)
        }

        console.log(response)

        if ( response === undefined || !response.data.success ){
            return false;
        } else {

            const { payload } = response.data;

            circolo.value = payload

        }

    })

    const oraFine = computed( () => {
        if( !dataOra.value || !circolo.value?.durataSlot )
            return undefined;
        else
            return dataOra.value?.plus({ minutes: circolo.value.durataSlot }).toJSDate()
    } )

    const pNomeCircolo = computed( () => {
        if( !circolo.value?.nome )
            return nomeCircolo.value || "Circolo"
        else
            return circolo.value.nome
    } )


</script>


<template>

    <MobileHeader :ready="true" :title='"Nuova partita"'>
        <template v-slot:leftSide>
            <img src='/img/indietro_white.png' v-on:click="router.go(-1)">
        </template>
    </MobileHeader>

    <PartitaHeader :iscritto="false" :nomeCircolo="pNomeCircolo"/>
    <PartitaHeaderInfo :dataOraInizioPartita="dataOra?.toJSDate()" :oraFinePartita="oraFine" :tipoCampo="tipoCampo"/>


    <label :class="classeLabelCategoria">Categoria minima</label>
    <input
        :class=classeSliderCategoria
        v-model="categoria_min"
        type="range"

        max='5' min='1' step='1'
    />
    <label :class="classeLabelCategoria">Categoria massima</label>
    <input
        :class=classeSliderCategoria
        v-model="categoria_max"
        type="range" max='5' min='1' step='1'
    />

    <div class='my-3 text-2xl w-full block text-center'>{{ getCategoriaString }}</div>

</template>

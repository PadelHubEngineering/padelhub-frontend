<script setup lang='ts'>

    import { computed, onMounted, ref, type Ref } from 'vue'
    import { Color } from '../GestioneSlot/ItemSlot.vue'
    import QuickShowPartite from "../partite/QuickShowPartite.vue"
    import axios, { AxiosError } from 'axios'
    import { useAuthUserStore } from '@/stores/authStore';

    const authUserStore = useAuthUserStore();

    var id_campo = ref("")
    var data_ora_inizio = ref(new Date())
    var data_ora_fine = ref(new Date())
    var slot_color: Ref<Color | null> = ref(null)
    var req_error = ref("")
    var id_partita = ref("")

    const dialog = ref<HTMLDialogElement>()
    const buttonStyle = ref("rounded-2xl p-2 border-solid border-bluPadelHub border-2")


    function openModal(_data_ora_inizio: Date, _ora_fine: Date, color: Color, _id_campo: string, _id_partita: string) {
        data_ora_inizio.value = _data_ora_inizio;
        data_ora_fine.value = _ora_fine;
        slot_color.value = color
        id_campo.value = _id_campo
        id_partita.value = _id_partita

        dialog.value?.showModal()
    }

    function closeModal() {
        req_error.value = ""
        dialog.value?.close()
    }

    async function confirm() {
        console.log(`tento prenotazione con data: ${data_ora_inizio.value} e campo: ${id_campo.value}`)

        let response;

        try{
            response = await axios.post(
                `${import.meta.env.VITE_BACK_URL}/api/v1/circolo/prenotazioneSlot`,
                {
                    dataOraPrenotazione: data_ora_inizio.value,
                    idCampo: id_campo.value,
                    token: authUserStore.token
                },
            )
        } catch (error: any) {
            req_error.value = error.response.data.status
            return false;
        }

        if ( response === undefined || !response.data.success ){
            req_error.value = response?.data.message || "Errore generico"
            return false;
        } else {

            alert(response.data.payload.message)

            closeModal();

            return response.data.payload.prenotazione;
        }

    }

    defineExpose({
        openModal
    })

    function dateToTime(date: Date) {
        return `${date.getHours().toString().padStart(2,"0")}:${date.getMinutes().toString().padStart(2,"0")}`
    }

    let isRosso = computed(() => {
        return slot_color.value == Color.Red
    })
    let isVerde = computed(() => {
        return slot_color.value == Color.Green
    })
    let isGiallo = computed(() => {
        return slot_color.value == Color.Yellow
    })
    let hasNotError = computed(() => {
        return req_error.value === ""
    })

</script>

<template>
    <dialog ref='dialog' class='rounded-2xl p-4'>


        <div v-if="isRosso" class="flex flex-col w-96">
            <h2>C'è già una partita a quanto pare</h2>
            <QuickShowPartite :id_partita='id_partita'/>
        </div>

        <div class="flex flex-col" v-else-if='isVerde'>
            <h2 class='text-xl pb-5'>
                Confermi di voler occupare lo slot?
            </h2>

            <p>
                Stai per occupare lo slot <b>{{ dateToTime(data_ora_inizio) }} - {{ dateToTime(data_ora_fine) }}</b>
            </p>
            <p>
                In questo modo nessuna partita potrà essere creata in questo slot
            </p>

        </div>
        <div class="flex flex-col" v-else>
            <h2 class='text-xl pb-5'>
                Hai già prenotato questo slot
            </h2>
        </div>
        <div class='flex justify-end gap-x-2 mt-2'>
            <button @click.prevent='closeModal' :class='[ buttonStyle ]'>Annulla</button>
            <button @click.prevent='confirm' :class='[ buttonStyle ]' class='bg-bluPadelHub text-white'>Conferma</button>

        </div>
        <p :class="{ hidden: hasNotError }" class='text-redBusy'>
            {{ req_error }}
        </p>




    </dialog>
</template>

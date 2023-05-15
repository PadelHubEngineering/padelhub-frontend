<script setup lang='ts'>

    import { computed, onMounted, ref } from 'vue'

    let props = defineProps(['data_ora_slot', 'id_partita'])

    var ora_inizio = ref("")
    var ora_fine = ref("")

    const dialog = ref<HTMLDialogElement>()
    const buttonStyle = ref("rounded-2xl p-2 border-solid border-bluPadelHub border-2")

    function openModal(start:string, end: string, id_partita: number) {
        ora_inizio.value = start
        ora_fine.value = end
        console.log("ok bello", id_partita)
        dialog.value?.showModal()
    }

    function closeModal() {
        dialog.value?.close()
    }

    function confirm() {
        console.log("Aiuto devo rimborsare un sacco di genteeeeee")
    }

    defineExpose({
        openModal
    })

    let partita = computed(() => {
        if ( props.id_partita ) {
            return {
                'id_partita': props.id_partita,
                'giocatori': [
                    { email: "marco" },
                    { email: "sabri" }
                ]
            }
        } else {
            return null;
        }

    })
</script>

<template>
    <dialog ref='dialog' class='rounded-2xl p-4'>


        <div v-if="partita" class="flex flex-col">
            <h2>C'è già una partita a quanto pare</h2>
        </div>

        <div class="flex flex-col" v-else>
            <h2 class='text-xl pb-5'>
                Confermi di voler occupare lo slot?
            </h2>

            <p>
                Stai per occupare lo slot <b>{{ ora_inizio }} - {{ ora_fine }}</b>
            </p>
            <p>
                In questo modo nessuna partita potrà essere creata in questo slot
            </p>

        </div>
        <div class='flex justify-end gap-x-2 mt-2'>
            <button @click.prevent='closeModal' :class='[ buttonStyle ]'>Annulla</button>
            <button @click.prevent='confirm' :class='[ buttonStyle ]' class='bg-bluPadelHub text-white'>Conferma</button>

        </div>




    </dialog>
</template>

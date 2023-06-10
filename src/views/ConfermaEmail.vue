
<script setup lang='ts'>
    import MobileHeader from '@/components/MobileHeader.vue';
    import ConfirmationIcon from '@/components/icons/ConfirmationIcon.vue';
    import ErrorIcon from '@/components/icons/ErrorIcon.vue';
    import { useAuthUserStore } from '@/stores/authStore';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import DotLoader from "vue-spinner/src/DotLoader.vue"


    const router = useRouter();
    const route = useRoute();
    const authUserStore = useAuthUserStore();

    const { codiceConferma } = route.query;

    const isConfirmed = ref( false )
    const isErrored = ref( false )
    const isLoading = ref( true )

    async function confirm_email() {

        let response;
        try{
            response = await axios.put(
                `${import.meta.env.VITE_BACK_URL}/api/v1/authentication/verificaUtente/${codiceConferma}`,
                {},
                {
                    headers: {
                        'x-access-token': authUserStore.token
                    }
                }
            )
        } catch (error: any) {
            console.log("Impossibile confermare email " + error.response.data.status)

            isLoading.value = false;
            isErrored.value = true;
        }

        console.log(response)

        isLoading.value = false;

        if ( response === undefined || !response.data.success ){
            console.log("Impossibile confermare email")
            isErrored.value = true;
            return false;
        } else {
            isConfirmed.value = true;
        }
    }

    onMounted( async () => {
        await confirm_email();
    } )


</script>

<template>

    <div class='flex flex-col items-center'>
        <MobileHeader :ready="true" />

        <h1 v-if="isLoading" class='text-4xl text-center mt-4'>Loading</h1>
        <h1 v-else-if="!isLoading && isConfirmed" class='text-4xl text-center mt-4'>Email confermata correttamente</h1>
        <h1 v-else class='text-3xl text-center mt-4'>Impossibile confermare email</h1>

        <dot-loader
            class='w-20'
            v-if="isLoading"
            :loading="isLoading"
            :size="'80'"
            :color="'#2f8cce'"
        ></dot-loader>
        <ConfirmationIcon v-else-if="!isLoading && isConfirmed"/>
        <ErrorIcon v-else class='h-full w-5/6 mx-auto'/>

        <button
            class=' rounded-xl px-4 py-3 text-xl w-2/3 mx-auto mt-5 block border-bluPadelHub border-2 text-bluPadelHub'
            v-on:click.prevent="router.push({ path: '/' })"
        >Vai alla home</button>

    </div>


</template>

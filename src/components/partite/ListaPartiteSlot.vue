
<script setup lang="ts">
    import axios from 'axios';
    import { onMounted, ref, type Ref } from 'vue';
    import type { PartitaRetI, PartiteAperteI } from './Partita.types';

    import PartitaListItem from "./PartitaListItem.vue"

    const props = defineProps({
        partite: { type: Array<PartitaRetI>, required: true},
    })

</script>

<template>
    <div v-for="p in props.partite">
        <router-link :to="{ name: 'InfoPartita', params: { idPartita: p._id  } }">
            <PartitaListItem :partita="p" @on.click="" />
        </router-link>
    </div>
</template>

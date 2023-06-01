
<script setup lang='ts'>
    import CampoBgIcon from "@/components/icons/CampoBgIcon.vue"
import { computed } from "vue"

    const props = defineProps({
        usersImgs: { type: Array<string>, required: false }
    })

    const classImageCircle = 'absolute rounded-full border border-bluPadelHub foto-size flex justify-center items-center bg-white overflow-hidden'

    const icona_a = computed( () => {
        if ( !props.usersImgs || props.usersImgs.length <= 0 )
            return "/img/icona_vuoto.png"
        else {
            if ( !props.usersImgs[0] )
                return "/img/icona_giocatore.png"
            else
                return `data:image/png;base64,${props.usersImgs[0]}`
        }
    } )
    const has_icona_a = computed( () => ( !props.usersImgs || props.usersImgs.length <= 0 ) ? 50: (props.usersImgs[0] ? 100: 60))
    const icona_b = computed( () => {
        if ( !props.usersImgs || props.usersImgs.length <= 1 )
            return "/img/icona_vuoto.png"
        else {
            if ( !props.usersImgs[1] )
                return "/img/icona_giocatore.png"
            else
                return `data:image/png;base64,${props.usersImgs[1]}`
        }
    } )
    const has_icona_b = computed( () => ( !props.usersImgs || props.usersImgs.length <= 1 ) ? 50: (props.usersImgs[1] ? 100: 60))
    const icona_c = computed( () => {
        if ( !props.usersImgs || props.usersImgs.length <= 2 )
            return "/img/icona_vuoto.png"
        else {
            if ( !props.usersImgs[2] )
                return "/img/icona_giocatore.png"
            else
                return `data:image/png;base64,${props.usersImgs[2]}`
        }
    } )
    const has_icona_c = computed( () => ( !props.usersImgs || props.usersImgs.length <= 2 ) ? 50: (props.usersImgs[2] ? 100: 60))
    const icona_d = computed( () => {
        if ( !props.usersImgs || props.usersImgs.length <= 3 )
            return "/img/icona_vuoto.png"
        else {
            if ( !props.usersImgs[3] )
                return "/img/icona_giocatore.png"
            else
                return `data:image/png;base64,${props.usersImgs[3]}`
        }
    } )
    const has_icona_d = computed( () => ( !props.usersImgs || props.usersImgs.length <= 3 ) ? 50: (props.usersImgs[3] ? 100: 60))
</script>

<template>
    <div class='w-full h-80 relative flex justify-center items-center'>

        <div :class="classImageCircle" class='left-3 bottom-14'  >
            <img :src="icona_a" :width="has_icona_a">
        </div>

        <div :class="classImageCircle" class='top-9 left-20'>
            <img :src="icona_b" :width="has_icona_b">
        </div>

        <div :class="classImageCircle" class='top-14 right-16'>
            <img :src="icona_c" :width="has_icona_c">
        </div>

        <div :class="classImageCircle" class='right-6 bottom-8'>
            <img :src="icona_d" :width="has_icona_d">
        </div>

        <CampoBgIcon class='campo-icon' />

    </div>
</template>


<style>
    .campo-icon {
        width: 80%;
        margin: auto;
    }
    .foto-size {
        height: 100px;
        width: 100px;
    }
</style>

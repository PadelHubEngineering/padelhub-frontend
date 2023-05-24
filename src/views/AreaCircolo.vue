<template>
    <div class="flex h-screen w-screen">
        <CircoloMenuComponent class='w-1/5 min-w-[300px]' />
        <div class="w-4/5 max-w-4/5 ml-5 mt-5 overflow-x-auto">
            <div class="grid grid-rows-2">
                <div class="flex px-6">
                    <Carousel class="w-4/6 px-2" :slide=false></Carousel>
                    <Button class="flex-auto px-2"> + </Button>
                </div>
                <div class="grid grid-cols-2 px-10 py-10 divide-x-4">
                    <div>01</div>
                    <div>02</div>
                </div>
            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import CircoloMenuComponent from '@/components/CircoloMenuItems/CircoloMenuComponent.vue';
import { Carousel, Button } from 'flowbite-vue'


</script>
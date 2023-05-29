<template>
    <div>{{ giorno }}</div>
    <Input size="sm" placeholder="ora" />
    <Input size="sm" placeholder="ora"/>
</template>

<script setup lang="ts">
import CircoloMenuComponent from '@/components/CircoloMenuItems/CircoloMenuComponent.vue';
import { Carousel, Button, Input } from 'flowbite-vue'
import { ref } from 'vue';

defineProps({
    giorno: String
})
</script>
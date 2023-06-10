<template>
    <div class="field">
        <div>
            <label class="block mb-2 text-sm font-medium">{{ props.label }}</label>
            <Input
                type="range"
                min="500"
                max="4500"
                value="500"
                step="1000"
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                type=""
                v-model="input"
                @keyup="validateInput"
                @blue="validateInput"
                @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)"
            />
        </div>
        <div class="text-redBusy" v-if="errors.name">
            {{ errors.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateNameField, errors } from "@/modules/formValidation";
import { ref, computed, onMounted, onUpdated } from "vue";
import { Input } from 'flowbite-vue'
let countUpdate = 0;

const props = defineProps({
    val: {
        type: String
    },
    label: {
        type: String,
        default: "Categoria"
    },
})

onUpdated(() => {
    if(countUpdate == 0)
        input.value = props.val!
    countUpdate++
})

let input = ref<string | null>(null);
const validateInput = () => {
    validateNameField("name", input.value);
};

</script>

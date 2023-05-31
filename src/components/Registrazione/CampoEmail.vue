<template>
    <div class="">
        <div>
            <label for="CampoEmail" class="block mb-2 text-sm font-medium">{{ props.label }}</label>
            <Input type="text" name="email" :placeholder="props.placeholder" autocomplete="off" v-model="input"
                @keyup="validateInput" @blue="validateInput"
                @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)" />
        </div>
        <div class="text-redBusy" v-if="errors.email">
            {{ errors.email }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateEmailField, errors } from "@/modules/formValidation";
import { ref, computed, onUpdated } from "vue";
import { Input } from 'flowbite-vue'

let countUpdate = 0;

const props = defineProps({
    val: {
        type: String
    },
    label: {
        type: String,
        default: "Email"
    },
    placeholder: {
        type: String,
        default: "Inserisci l'email..."
    }
})

let input = ref<string | null>(null);
onUpdated(() => {
    if (countUpdate == 0)
        input.value = props.val!
    countUpdate++
})
const validateInput = () => {
    validateEmailField("email", input.value);
};

</script>
<template>
    <div class="field">
        <div>
            <label for="CampoNickname" class="block mb-2 text-sm font-medium">{{ props.label }}</label>
            <Input type="text" name="nickname" :placeholder="props.placeholder"
                autocomplete="off" v-model="input" @keyup="validateInput" @blue="validateInput" @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)"/>
        </div>
        <div class="text-redBusy" v-if="errors.name">
            {{ errors.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateNickNameField, errors } from "@/modules/formValidation";
import { ref, computed, onMounted, onUpdated } from "vue";
import { Input} from 'flowbite-vue'
let countUpdate = 0;

const props = defineProps({
    val: {
        type: String
    },
    label: {
        type: String,
        default: "Nickname"
    },
    placeholder: {
        type: String,
        default: "Inserisci il nickname..."
    }
})

onUpdated(() => {
    if(countUpdate == 0)
        input.value = props.val!
    countUpdate++
})

let input = ref<string | null>(null);
const validateInput = () => {
    validateNickNameField("nickname", input.value);
};

</script>
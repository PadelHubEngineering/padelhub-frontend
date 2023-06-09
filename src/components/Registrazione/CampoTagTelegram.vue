<template>
    <div class="field">
        <div>
            <label for="CampoNickname" class="block mb-2 text-sm font-medium">{{ props.label }}</label>
            <Input type="text" name="tag" :placeholder="props.placeholder"
                autocomplete="off" v-model="input" @keyup="validateInput" @blue="validateInput" @input="$emit('update:modelValue', ($event!.target! as HTMLInputElement).value)"/>
        </div>
        <div class="text-redBusy" v-if="errors.name">
            {{ errors.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateTelegramTag, errors } from "@/modules/formValidation";
import { ref, computed, onMounted, onUpdated } from "vue";
import { Input} from 'flowbite-vue'
let countUpdate = 0;

const props = defineProps({
    val: {
        type: String
    },
    label: {
        type: String,
        default: "Tag Telegram"
    },
    placeholder: {
        type: String,
        default: "Inserisci il tuo tag telegram..."
    }
})

onUpdated(() => {
    if(countUpdate == 0)
        input.value = props.val!
    countUpdate++
})

let input = ref<string | null>(null);
const validateInput = () => {
    validateTelegramTag("tag", input.value);
};

</script>
<template>
    <div class="field">
        <div class="ui left icon input big">
            <i class="user icon"></i>
            <input type="text" placeholder="Full Name" autocomplete="off" v-model="input" @keyup="validateInput"
                @blue="validateInput" />
        </div>
        <div class="ui basic label pointing red" v-if="errors.name">
            {{ errors.name }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateNameField, errors } from "@/modules/formValidation";
import { ref, computed } from "vue";
let input = ref<string | null>(null);
//const { validateNameField, errors } = useFormValidation();
const validateInput = () => {
    validateNameField("name", input.value);
};

</script>
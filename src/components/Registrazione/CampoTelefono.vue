<template>
    <div class="field">
        <div class="ui left icon input big">
            <i class="user icon"></i>
            <input type="text" placeholder="Telefono" autocomplete="off" v-model="input" @keyup="validateInput"
                @blue="validateInput" />
        </div>
        <div class="ui basic label pointing red" v-if="errors.telefono">
            {{ errors.telefono }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { validateTelefonoField, errors } from "@/modules/formValidation";
import { ref, computed } from "vue";
let input = ref<string | null>(null);
const validateInput = () => {
   validateTelefonoField("telefono", input.value);
};

</script>
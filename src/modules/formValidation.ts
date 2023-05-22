import { reactive } from "@vue/reactivity";
import { isEmpty, minLength, isNum, isValidRegex } from "./validators";
const errors : any = reactive({});
export function validateNameField (fieldName: string, fieldValue: string | null) {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 4);
}

export function validateEmailField(fieldName: string, fieldValue: string | null) {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isValidRegex(fieldName, fieldValue, /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

export function validateTelefonoField(fieldName: string, fieldValue: string | null) {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isNum(fieldName, fieldValue)
}

export function validatePasswordField(fieldName: string, fieldValue: string | null) {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : minLength(fieldName, fieldValue, 8)
}
export { errors };


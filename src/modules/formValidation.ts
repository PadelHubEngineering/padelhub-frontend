import { reactive } from "@vue/reactivity";
import { isEmpty, minLength, isNum, isValidRegex } from "./validators";
const errors: any = reactive({});
export function validateNameField(fieldName: string, fieldValue: string | null) {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isValidRegex(fieldName, fieldValue, /^[A-Za-z]{2,30}$/)
}

export function validateEmailField(fieldName: string, fieldValue: string | null) {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isValidRegex(fieldName, fieldValue, /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

export function validateTelefonoField(fieldName: string, fieldValue: string | null) {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isValidRegex(fieldName, fieldValue, /^(3[0-9]{8,9})|(0{1}[1-9]{1,3})[\s|\.|\-]?(\d{4,})$/)
}

export function validatePasswordField(fieldName: string, fieldValue: string | null) {
    errors[fieldName] = !fieldValue ? isEmpty(fieldName, fieldValue) : isValidRegex(fieldName, fieldValue, /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "8 caratteri - almeno una lettera maiuscola - almeno una minuscola - almeno un numero - almeno un carattere speciale")
}
export function validateConfirmPasswordField(fieldName: string, fieldValue: string | null, fieldValueConfirm: string | null) {
    errors[fieldName] = fieldValue == fieldValueConfirm ? "" : "La password non corrisponde a quella inserita precedentemente."
}
export { errors };


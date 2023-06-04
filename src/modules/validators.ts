import { file } from "@babel/types";

export function isEmpty (fieldName: string, fieldValue: string | null) {
    return !fieldValue ? "Il campo " + fieldName + " è richiesto." : "";
}

export function minLength (fieldName: string, fieldValue: string | null, min: number) {
    return fieldValue != null && fieldValue.length < min ? `Il campo ${fieldName} deve avere almeno ${min} caratteri` : "";
}

export function isValidRegex (fieldName: string, fieldValue: string | null, regex: RegExp, requirements: string = "") {
    return fieldValue != null && !regex.test(fieldValue) ? "Il campo " + fieldName + " non rispetta i requisiti. " + requirements: "";
}

export function isNum  (fieldName: string, fieldValue: string | null) {
    let isNum = fieldValue != null ? /^\d+$/.test(fieldValue) : false;
    return !isNum ? "Il " + fieldName + " campo accetta solo numeri" : "";
}
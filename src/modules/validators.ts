import { file } from "@babel/types";

export function isEmpty (fieldName: string, fieldValue: string | null) {
    return !fieldValue ? "The " + fieldName + " field is required" : "";
}

export function minLength (fieldName: string, fieldValue: string | null, min: number) {
    return fieldValue != null && fieldValue.length < min ? `The ${fieldName} field must be atleast ${min} characters long` : "";
}

export function isValidRegex (fieldName: string, fieldValue: string | null, regex: RegExp ) {
    //let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return fieldValue != null && !regex.test(fieldValue) ? "The input is not a valid " + fieldName + " address" : "";
}

export function isNum  (fieldName: string, fieldValue: string | null) {
    let isNum = fieldValue != null ? /^\d+$/.test(fieldValue) : false;
    return !isNum ? "The " + fieldName + " field only have numbers" : "";
}
import { computed } from "vue";
import { reactive } from "vue";
import { type Utente, Genere } from "./types";


export function useSubmitButtonState(user: any, errors: any) {

    const isSignupButtonDisabled = computed(() => {
        let disabled = true;
        for (let prop in user) {
            if (!user[prop] || errors[prop]) {
                disabled = true;
                break;
            }
            disabled = false;
        }

        return disabled;
    });

    return { isSignupButtonDisabled }
}

export function useSubmitButtonStateGiocatore(user: Utente, errors: any) {

    const isSignupButtonDisabled = computed(() => {
        let disabled = true;
        const toCheck = ["nome", "cognome", "email", "nickname", "password", "confPassword", "livello"]

        for (const key of Object.keys(user)) {
            if (toCheck.includes(key)) {
                if (user[key as keyof Utente] == "") {
                    console.log("disabilitato")
                    console.log(user)
                    disabled = true;
                    break;
                }
                console.log(false)
                disabled = false
            }
        }

        // for (let prop in toCheck) {
        //     console.log(user)
        //     if (!user[prop as keyof Utente] || errors[prop]) {
        //         console.log("prop " + prop as keyof Utente + " "  +(<any>user)[prop])
        //         console.log("err "+ (prop  as keyof Utente) + " " + errors[prop])
        //         disabled = true;
        //         break;
        //     }
        //     disabled = false;
        // }

        return disabled;
    });

    return { isSignupButtonDisabled }
}
import { computed } from "vue";

export default function useSubmitButtonState(user: any, errors: any) {

    const isSignupButtonDisabled = computed(() => {
        let disabled = true;
        for (let prop in user) {
            console.log(`user: ${user[prop]} error: ${errors[prop]} prop: ${prop}`)

            if (!user[prop] || errors[prop]) {
                disabled = true;
                break;
            }
            else{console.log("ok")}
            disabled = false;
        }

        return disabled;
    });

    return { isSignupButtonDisabled }
}
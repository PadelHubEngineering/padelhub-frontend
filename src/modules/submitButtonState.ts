import { computed } from "vue";

export default function useSubmitButtonState(user: any, errors: any) {

    const isSignupButtonDisabled = computed(() => {
        let disabled = true;
        for (let prop in errors) {
            if (errors[prop]) {
                disabled = true;
                break;
            }
            disabled = false;
        }
        return disabled;
    });

    return { isSignupButtonDisabled }
}
import { EMAIL_STORAGE_KEY, SUBSCRIPTION_TIME_STORAGE_KEY } from "~/constants/subscription";

export const saveEmailToStorage = (email: string) => {
    window.localStorage.setItem(EMAIL_STORAGE_KEY, email)
}

export const saveTimeAfterSubscription = () => {
    window.localStorage.setItem(SUBSCRIPTION_TIME_STORAGE_KEY, Date.now().toString());
}
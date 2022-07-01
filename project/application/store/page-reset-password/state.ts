import { EStatus } from "~/constants/status";

export interface IState {
    form: {
        password: string;
        passwordConfirmation: string;
    };
    status: EStatus;
    error: Error | null;
    token: string;
}

export default (): IState => {
    return {
        form: {
            password: '',
            passwordConfirmation: ''
        },
        status: EStatus.INIT,
        error: null,
        token: ''
    };
}

import { EStatus } from "~/constants/status";

export interface IState {
    form: {
        email: string;
        password: string;
    };
    status: EStatus;
    error: Error | null;
}

export default (): IState => {
    return {
        form: {
            email: '',
            password: ''
        },
        status: EStatus.INIT,
        error: null,
    };
}

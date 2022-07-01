import { EStatus } from "~/constants/status";

export interface IState {
    form: {
        email: string;
    };
    status: EStatus;
    error: Error | null;
    message: string | null;
}

export default (): IState => {
    return {
        form: {
            email: ''
        },
        status: EStatus.INIT,
        error: null,
        message: null
    };
}

import { EStatus } from "~/constants/status";
import { IJobForm, IOfferResponse } from "~/types/job.interface";

export interface IState {
    status: EStatus;
    error: Error | null;
    offer: IOfferResponse | null,
    form: IJobForm;
    message: string;
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: null,
        offer: null,
        form: {
            name: '',
            phone: '',
            email: '',
            message: '',
            locale: '',
            file: null
        },
        message: ''
    };
}

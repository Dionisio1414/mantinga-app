import { EStatus } from "~/constants/status";
import { IProductInquiryRequest } from "~/types/product-inquiry.interface";

export interface IState {
    form: IProductInquiryRequest;
    status: EStatus;
    error: Error | null;
    message: string | null;
}

export default (): IState => {
    return {
        form: {
            email: '',
            name: '',
            phone: '',
            message: '',
            consent: 1,
            'products[]': null,
            locale: 'lt',
            isShoppingCart: false
        },
        status: EStatus.INIT,
        error: null,
        message: null
    };
}

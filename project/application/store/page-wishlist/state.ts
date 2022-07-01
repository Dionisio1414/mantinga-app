import { EStatus } from "~/constants/status";
import { IManagerProduct } from "~/types/manager-products.interface";
import { IProductInquiryRequest } from "~/types/product-inquiry.interface";

export interface IState {
    status: EStatus;
    error: Error | null;
    productsList: IManagerProduct[];
    form: IProductInquiryRequest;
    message: string | null;
    generatingStatus: EStatus;
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: null,
        productsList: [],
        form: {
            email: '',
            name: '',
            phone: '',
            message: '',
            consent: 1,
            locale: 'lt',
            isShoppingCart: true
        },
        message: null,
        generatingStatus: EStatus.INIT,
    };
}

import { EStatus } from "~/constants/status";
import { IManagerProduct, IManagerProductsGetParams } from "~/types/manager-products.interface";
import { IPagination } from "~/types/pagination.interface";
import { IProduct } from "~/types/product.interface";

export interface IState {
    status: EStatus;
    error: Error | null;
    products: IManagerProduct[];
    product: IProduct | null;
    pagination: IPagination;
    isSelectedAll: boolean;
    form: IManagerProductsGetParams;

}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: null,
        products: [],
        product: null,
        pagination: {
            pages: 0,
            page: 1,
            totalItems: 0,
            limitPerPage: 48
        },
        isSelectedAll: true,
        form: {
            name: '',
            code: '',
            status: undefined,
            product_taxons: undefined,
            locale_codes: undefined,
            page: 1
        },
    };
}

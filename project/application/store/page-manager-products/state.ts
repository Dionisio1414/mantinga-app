import { EStatus } from "~/constants/status";
import { IManagerFilters, IManagerProduct, IManagerProductsGetParams } from "~/types/manager-products.interface";
import { IPagination } from "~/types/pagination.interface";
import { IProduct } from "~/types/product.interface";
import { ITaxon } from "~/types/taxons";

export interface IState {
    status: EStatus;
    error: Error | null;
    products: IManagerProduct[];
    filters: IManagerFilters | null;
    form: IManagerProductsGetParams;
    product: IProduct | null;
    categories: ITaxon[] | null;
    pagination: IPagination;
    isSelectedAll: boolean;
    generatingStatus: EStatus;
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: null,
        products: [],
        filters: null,
        form: {
            name: '',
            code: '',
            status: undefined,
            product_taxons: undefined,
            locale_codes: undefined,
            page: 1
        },
        product: null,
        categories: null,
        pagination: {
            pages: 0,
            page: 0,
            totalItems: 0,
            limitPerPage: 48
        },
        isSelectedAll: false,
        generatingStatus: EStatus.INIT,
    };
}

import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IManagerProductsGetParams } from '~/types/manager-products.interface';

export default {
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    },
    products: state => {
        return state.products
    },
    filters: state => {
        return state.filters
    },
    currentProduct: state => {
        return state.product
    },
    categories: state => {
        return state.categories
    },
    params: state => {
        return state.form
    },
    sendObj: state => {
        const obj: IManagerProductsGetParams = {
            name: state.form.name,
            status: state.form.status,
            product_taxons: state.form?.product_taxons || '',
            // @ts-ignore
            locale_codes: state.form?.locale_codes && [state.form?.locale_codes] || undefined,
            page: state.form.page
        }

        for (const key in obj) {
            // @ts-ignore
            if (obj[key] === '' || obj[key] === undefined || obj[key] === null) delete obj[key]
        }
        return obj
    },
    pagination: (state) => {
        return {
            pages: state.pagination.pages,
            page: state.form.page,
            totalItems: state.pagination.totalItems,
            limitPerPage: state.pagination.limitPerPage
        }
    },
    isSelectedAll: (state) => {
        return state.isSelectedAll
    },
    generatingStatus: state => {
        return state.generatingStatus
    },
} as GetterTree<IState, IRootState>;

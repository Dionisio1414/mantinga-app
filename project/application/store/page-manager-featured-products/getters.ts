import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

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
    currentProduct: state => {
        return state.product
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
    }
} as GetterTree<IState, IRootState>;

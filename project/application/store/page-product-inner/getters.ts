import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    product: (state) => {
        return state.product;
    },
    productsList: (state) => {
        return state.productsList
    },
    recipes: (state) => {
        return state.recipes
    },
    similarProducts: (state) => {
        return state.similarProducts
    },
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    },
    generatingStatus: state => {
        return state.generatingStatus
    },
} as GetterTree<IState, IRootState>;

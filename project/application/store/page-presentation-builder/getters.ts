import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IPresentationBuilderCategory, IPresentationBuilderSubcategory } from '~/types/presentation-builder.interface';
import { IManagerProduct } from '~/types/manager-products.interface';

export default {
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    },
    categories: state => {
        return state.categories
    },
    generatingStatus: state => {
        return state.generatingStatus
    },
} as GetterTree<IState, IRootState>;

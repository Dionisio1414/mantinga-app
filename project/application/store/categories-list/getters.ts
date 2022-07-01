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
    allCategories: state => {
        return state.taxons
    }
} as GetterTree<IState, IRootState>;

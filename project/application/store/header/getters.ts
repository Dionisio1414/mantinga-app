import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    isMinimizedHeader: state => {
        return state.isMinimized;
    },
    isShowProductsCategories: state => {
        return state.isShowProductsCategories
    }
} as GetterTree<IState, IRootState>;

import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    favouriteProducts: (state) => {
        return state.favouriteProducts;
    },
} as GetterTree<IState, IRootState>;

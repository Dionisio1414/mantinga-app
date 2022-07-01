import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    currentLocale: (state) => {
        return state.currentLocale;
    },
} as GetterTree<IState, IRootState>;

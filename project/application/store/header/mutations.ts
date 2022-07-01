import { MutationTree } from 'vuex';

import { IState } from './state';

export default {
    CHANGE_HEADER_TYPE: (state, isMinimized: boolean) => {
        state.isMinimized = isMinimized;
    },
    toggleProducts: (state) => {
        state.isShowProductsCategories = !state.isShowProductsCategories
    },
    closeProducts: (state) => {
        state.isShowProductsCategories = false
    }
} as MutationTree<IState>;

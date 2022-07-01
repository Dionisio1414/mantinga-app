import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    changeHeaderType({ commit }, isMinimized): void {
        commit('CHANGE_HEADER_TYPE', isMinimized);
    },
    toggleProducts({ commit }): void {
        commit('toggleProducts')
    },
    closeProducts({ commit }): void {
        commit('closeProducts')
    }
} as ActionTree<IState, IRootState>;

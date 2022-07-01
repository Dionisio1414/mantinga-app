import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

import { IManagerTableRowToggle } from '~/types/manager-table.interface';
import { ISelectedProduct } from '~/types/selected-product';

export default {
    toggleProduct({ commit }, value: IManagerTableRowToggle): void {
        commit('toggleProduct', value)
    },
    toggleAllProducts({ commit }, value: boolean): void {
        commit('toggleAllProducts', value)
    },
    updateSelectedIds({ commit }, ids: ISelectedProduct): void {
        commit('updateSelectedIds', ids)
    },
    clearProducts({ commit }): void {
        commit('clearProducts')
    },
    selectLocale({ commit }, locale: string): void {
        commit('selectLocale', locale)
    },
    resetSelectedLocale({ commit }): void {
        commit('resetSelectedLocale')
    }
} as ActionTree<IState, IRootState>;

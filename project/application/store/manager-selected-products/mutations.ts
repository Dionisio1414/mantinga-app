import { MutationTree } from 'vuex';
import { IManagerTableRowToggle } from '~/types/manager-table.interface';
import { ISelectedProduct } from '~/types/selected-product';

import { IState } from './state';

export default {
    toggleProduct: (state, payload: IManagerTableRowToggle) => {
        if (payload.selected) state.selectedProducts.push({ id: payload.id, locales: payload.locales })
        else state.selectedProducts = state.selectedProducts.filter((r: ISelectedProduct) => r.id !== payload.id)
    },
    updateSelectedIds: (state, ids: any) => {
        state.selectedProducts = ids
    },
    clearProducts: (state) => {
        state.selectedProducts = []
    },
    selectLocale: (state, locale: string) => {
        state.selectedLocale = locale
    },
    resetSelectedLocale: state => {
        state.selectedLocale = ''
    }
} as MutationTree<IState>;

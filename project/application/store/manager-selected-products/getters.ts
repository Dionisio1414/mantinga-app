import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { ISelectedProduct } from '~/types/selected-product';

export default {
    selectedProductsIds: (state) => {
        return state.selectedProducts.map(p => p.id);
    },
    matchedLocales: (state) => {
        const locales: string[][] = state.selectedProducts?.map((product: ISelectedProduct) => product?.locales) || [];
        let result: string[] = [];

        if(locales?.length) result = locales.reduce((p,c) => p.filter(e => c.includes(e)));

        return result
    },
    selectedLocale: state => {
        return state.selectedLocale
    }
} as GetterTree<IState, IRootState>;

import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IDictionary } from '~/types/dictionary.interface';

const favouriteProductsCookieName = 'favourite-products';

export default {
    updateFavouritesProducts({ commit }, id: number): void {
        const favouriteProducts: IDictionary<number> = this.app.$cookies.get(favouriteProductsCookieName) || {};

        if (favouriteProducts[id]) delete favouriteProducts[id]
        else favouriteProducts[id] = id;

        this.app.$cookies.set('favourite-products', favouriteProducts)

        commit('setFavouritesProductsFromCookie', favouriteProducts)
    },
    setFavouritesProductsFromCookie({ commit }): void {
        const favouriteProducts: IDictionary<number> = this.app.$cookies.get(favouriteProductsCookieName) || {};

        commit('setFavouritesProductsFromCookie', favouriteProducts);
    },
    clearFavouriteProducts({dispatch}): void {
        this.app.$cookies.remove('favourite-products');

        dispatch('setFavouritesProductsFromCookie')
    }
} as ActionTree<IState, IRootState>;

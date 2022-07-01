import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IRecipeGetParams, IRecipesPayloadPaginate } from '~/types/recipes.interface';

export default {
    async fetchProducts({ commit }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        commit('fetchProductsInit')
        try {

            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/shop/products`
            )

            commit('fetchProductsSuccess', data)

        } catch(e: any) {
            commit('fetchProductsError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

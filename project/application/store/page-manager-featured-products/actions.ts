import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

import httpErrorSerializer from '~/utils/http-error-serializer';
import { mixinFormMapperActions, mixinFormMapperUpdateForm } from '~/store-utils/form-mapper-mixins';
import { IManagerProduct } from '~/types/manager-products.interface';
import { NuxtCookies } from 'cookie-universal-nuxt';

export default {
    async fetchProducts({ commit, rootGetters, getters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale = rootGetters['locale/currentLocale'] || 'lt'
        const ids = rootGetters['manager-selected-products/selectedProductsIds'];

        const params = {
            ids,
            limit: 48,
            page: getters.pagination.page
        }
        
        commit('fetchProductsInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/secure/product-manager/${locale}/search`,
                { params }
            );
            commit('fetchProductsSuccess', data)
        } catch (e) {
            commit('fetchProductsError', httpErrorSerializer(e))
        }
    },
    async fetchProductById({ commit, rootGetters }, id: string): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale = rootGetters['locale/currentLocale'];
        const $cookies: NuxtCookies = this.$cookies;

        const config = {
            headers: { Authorization: `Bearer ${$cookies.get('authToken')}` }
        }

        commit('fetchProductByIdInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/product/${locale}/${id}`,
                { ...config }
            );
            commit('fetchProductByIdSuccess', data)
        } catch (e) {
            commit('fetchProductByIdError', httpErrorSerializer(e))
        }
    },
    toggleAllProducts({ commit, getters, dispatch }, value: boolean): void {
        if (!value) {
            dispatch('manager-selected-products/clearProducts', null, { root: true });
        } else {
            const newIds = getters.products.map((p: IManagerProduct) => p.id)
            dispatch('manager-selected-products/updateSelectedIds', newIds, { root: true});
        }

        commit('toggleAllProducts', value);
    },
    ...mixinFormMapperActions(),
    ...mixinFormMapperUpdateForm(),
} as ActionTree<IState, IRootState>;

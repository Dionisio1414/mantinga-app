import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

import httpErrorSerializer from '~/utils/http-error-serializer';
import {
  mixinFormMapperActions,
  mixinFormMapperUpdateForm,
  mixinFormMapperSetForm
} from '~/store-utils/form-mapper-mixins';
import { IManagerProduct, IManagerProductsGetParams } from '~/types/manager-products.interface';
import { NuxtCookies } from 'cookie-universal-nuxt';

export default {
    async fetchProducts({ commit, rootGetters, getters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale = rootGetters['locale/currentLocale'] || 'lt'

        const params: IManagerProductsGetParams = {
            limit: 48,
            ...getters.sendObj
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
    async fetchProductById({ commit, rootGetters }, slug: string): Promise<void> {
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
                `${this.app.$config.apiURL}/mantinga-api/product/${locale}/${slug}`,
                { ...config }
            );
            commit('fetchProductByIdSuccess', data)
        } catch (e) {
            commit('fetchProductByIdError', httpErrorSerializer(e))
        }
    },
    clearFilters({ commit }): void {
        commit('clearFilters');
    },
    clearSearch({ commit }): void {
        commit('clearSearch');
    },
    toggleAllProducts({ commit, getters, dispatch }, value: boolean): void {
        if (!value) {
            dispatch('manager-selected-products/clearProducts', null, { root: true });
        } else {
            const newIds = getters.products.map((p: IManagerProduct) => ({id: p.id, locales: p.translations}))
            dispatch('manager-selected-products/updateSelectedIds', newIds, { root: true});
        }

        commit('toggleAllProducts', value);
    },
    async downloadPresentation({ commit, rootGetters }, id: number): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale'];

        const params = {
            products: id.toString(),
            isShoppingCart: true
        }
        commit('downloadPresentationInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/presentation/${locale}/product`, { params, responseType: 'blob' },
            );
            const element = document.createElement('a')
            element.href = (window.URL || window.webkitURL).createObjectURL(
                new Blob([data], { type: 'application/pdf' })
            )
            element.setAttribute('download', '')
            element.click()
            commit('downloadPresentationSuccess')

        } catch (e) {
            commit('downloadPresentationError', httpErrorSerializer(e))
        }
    },
    ...mixinFormMapperActions(),
    ...mixinFormMapperUpdateForm(),
    ...mixinFormMapperSetForm(),
} as ActionTree<IState, IRootState>;

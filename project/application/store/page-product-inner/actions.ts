import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { IRecipeGetParams } from '~/types/recipes.interface';


export default {
    async fetchProduct({ commit, rootGetters }, slug: string): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale = rootGetters['locale/currentLocale'];

        commit('fetchProductInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/product/${locale}/${slug}`,
            );
            commit('fetchProductSuccess', data)
        } catch (e) {
            commit('fetchProductError', httpErrorSerializer(e))
        }
    },
    async fetchSimilarProducts({ commit, rootGetters }, id: number): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale = rootGetters['locale/currentLocale'];

        commit('fetchSimilarProductsInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/product/${locale}/similar-product/${id}`,
            );
            commit('fetchSimilarProductsSuccess', data)
        } catch (e) {
            commit('fetchSimilarProductsError', httpErrorSerializer(e))
        }
    },
    async fetchRecipes({ commit }, productId: number): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        const params: IRecipeGetParams = {
            'order[date]': 'desc',
            'order[id]': 'desc',
            'products.id': productId,
            itemsPerPage: 4
        }

        commit('fetchRecipesInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/recipes`,
                { params }
            );
            commit('fetchRecipesSuccess', data)
        } catch (e) {
            commit('fetchRecipesError', httpErrorSerializer(e))
        }
    },
    async downloadImagesZip({ commit }, id: number): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        commit('downloadImagesZipInit')
        try {
            const { data } = await $axios.post(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/product/${id}/image-download`, null, { responseType: 'blob' }
            );

            const element = document.createElement('a')
            element.href = (window.URL || window.webkitURL).createObjectURL(
                new Blob([data], { type: 'application/zip' })
            )
            element.setAttribute('download', '')
            element.click()
            commit('downloadImagesZipSuccess')

        } catch (e) {
            commit('downloadImagesZipError', httpErrorSerializer(e))
        }
    },
    async downloadPresentation({ commit, rootGetters }, id: number): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale'];

        const params = {
            products: id.toString(),
            isShoppingCart: false
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
    }
} as ActionTree<IState, IRootState>;

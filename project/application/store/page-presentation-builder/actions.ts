import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

import httpErrorSerializer from '~/utils/http-error-serializer';
import { IChangeCategoryPositionPayload, IChangeProductPositionPayload, IDeleteProductPayload, IPresentationBuilderCategory, IPresentationBuilderSubcategory } from '~/types/presentation-builder.interface';
import { IManagerProduct } from '~/types/manager-products.interface';
import { NuxtCookies } from 'cookie-universal-nuxt';

export default {
    async fetchProducts({ commit, rootGetters }): Promise<void> {
        const ids = rootGetters['manager-selected-products/selectedProductsIds'];

        commit('clearCategories');

        if (ids && ids.length) {
            const $axios: NuxtAxiosInstance = this.$axios;
            const locale = rootGetters['locale/currentLocale'] || 'lt'
            const allCategories = rootGetters['categories-list/allCategories'];

            const params = {
                ids,
                limit: 1000,
                page: 1
            }

            commit('fetchProductsInit')
            try {
                const { data } = await $axios.get(
                    // @ts-ignore
                    `${this.app.$config.apiURL}/mantinga-api/secure/product-manager/${locale}/search`,
                    { params }
                );
                commit('fetchProductsSuccess', { data, allCategories })
            } catch (e) {
                commit('fetchProductsError', httpErrorSerializer(e))
            }
        }
    },
    async generatePresentation({ commit, getters, rootGetters }) {
        const ids: number[][] = []

        ids.push([...getters.categories.map((c: IPresentationBuilderCategory) => {
            return c?.children.map((s: IPresentationBuilderSubcategory) => {
                return s?.products?.map((p: IManagerProduct) => p.id) || []
            }) || []
        })])

        const products = ids.flat(Infinity).join(',')

        if (products) {
            const $axios: NuxtAxiosInstance = this.$axios;
            const $cookies: NuxtCookies = this.$cookies;
            const localeForPresentation = rootGetters['manager-selected-products/selectedLocale']

            const params = {
                products,
                locale: localeForPresentation
            }

            const config = {
                headers: { Authorization: `Bearer ${$cookies.get('authToken')}` }
            }

            commit('generatePresentationInit')
            try {
                const { data } = await $axios.get(
                    // @ts-ignore
                    `${this.app.$config.apiURL}/mantinga-api/secure/presentation/${localeForPresentation}/product/builder`,
                    { params,  responseType: 'blob', ...config }
                );

                const element = document.createElement('a')
                element.href = (window.URL || window.webkitURL).createObjectURL(
                    new Blob([data], { type: 'application/pdf' })
                )
                element.setAttribute('download', '')
                element.click()

                commit('generatePresentationSuccess')
            } catch (e) {
                commit('generatePresentationError', httpErrorSerializer(e))
            }
        }
    },
    deleteCategory({ commit }, categoryId: number) {
        commit('deleteCategory', categoryId)
    },
    deleteProduct({ commit }, params: IDeleteProductPayload) {
        commit('deleteProduct', params)
    },
    changeProductPosition({ commit }, payload: IChangeCategoryPositionPayload) {
        commit('changeProductPosition', payload)
    },
    changeCategoryPosition({ commit }, payload: IChangeProductPositionPayload) {
        commit('changeCategoryPosition', payload)
    },
    updateCategories({ commit }, payload: IPresentationBuilderCategory[]) {
        commit('updateCategories', payload)
    }
} as ActionTree<IState, IRootState>;

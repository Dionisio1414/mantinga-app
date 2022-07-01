import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { mixinFormMapperActions } from '~/store-utils/form-mapper-mixins';
import { saveEmailToStorage } from '~/store-utils/newsletter';


export default {
    async fetchProducts({ commit, rootGetters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale = rootGetters['locale/currentLocale']
        const ids = rootGetters['favourite-products/favouriteProducts'];
        const params = {
            ids
        }

        if(ids && ids.length) {
            commit('fetchProductsInit')
            try {
                const { data } = await $axios.get(
                    // @ts-ignore
                    `${this.app.$config.apiURL}/mantinga-api/product/shop/${locale}/search`,
                    { params }
                );
                commit('fetchProductsSuccess', data)
            } catch (e) {
                commit('fetchProductsError', httpErrorSerializer(e))
            }
        }
    },
    async productInquiry({ commit, getters, rootGetters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const ids = rootGetters['favourite-products/favouriteProducts'];
        const body = { 
            ...getters.form,
            locale: rootGetters['locale/currentLocale'],
        };

        const formData = new FormData();
        for(const key in body) {
            if(!body[key]) continue
            formData.append(key, body[key]);
        }

        ids.forEach((element: number) => {
            formData.append('products[]', element.toString()) 
        });

        commit('productInquiryInit')
        try {
            const { data } = await $axios.post(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/product/product-inquiry`,
                formData
            );
            commit('productInquirySuccess', data)
            saveEmailToStorage(body.email);
        } catch (e) {
            commit('productInquiryError', e)
        }
    },
    clearForm({ commit }) {
        commit('clearForm')
    },
    updateProductsList({commit}, productId: number): void {
        commit('updateProductsList', productId);
    },
    async downloadPresentation({ commit, rootGetters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale'];
        const ids = rootGetters['favourite-products/favouriteProducts'];

        const params = {
            products: ids.join(','),
            isShoppingCart: true
        }
        
        commit('downloadPresentationInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/presentation/${locale}/product`, { params, responseType: 'blob' },
            );
            commit('downloadPresentationSuccess')

            const element = document.createElement('a')
            element.href = (window.URL || window.webkitURL).createObjectURL(
                new Blob([data], { type: 'application/pdf' })
            )
            element.setAttribute('download', '')
            element.click()

        } catch (e) {
            commit('downloadPresentationError', httpErrorSerializer(e))
        }
    },
    ...mixinFormMapperActions()
} as ActionTree<IState, IRootState>;

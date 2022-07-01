import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';


export default {
    async fetchCategory({ commit, rootGetters }, slug: string): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale']

        commit('fetchCategoryInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/product/${locale}/category-page/${slug}`
            );
            commit('fetchCategorySuccess', data)
        } catch (e) {
            commit('fetchCategoryError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

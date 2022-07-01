import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

import httpErrorSerializer from "~/utils/http-error-serializer";


export default {
    async fetchPage({ commit, rootGetters }, slug: string): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale']

        commit('fetchPageInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/shop/${locale}/pages/${slug}`
            );
            commit('fetchPageSuccess', data)
        } catch (e) {
            commit('fetchPageError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

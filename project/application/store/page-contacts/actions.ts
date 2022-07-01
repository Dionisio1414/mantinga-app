import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';


export default {
    async fetchPageContacts({ commit, rootGetters }, slug: string): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale']

        commit('fetchPageContactsInit')
        try {
            const { data } = await $axios.get(`${this.app.$config.apiURL}/new-api/shop/${locale}/pages/${slug}`)

            commit('fetchPageContactsSuccess', data)
        } catch(e: any) {
            commit('fetchPageContactsError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

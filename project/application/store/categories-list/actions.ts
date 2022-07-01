import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';


export default {
    async fetchCategories({ commit, rootGetters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale']

        commit('fetchCategoriesInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/taxons/${locale}/list`
            );
            commit('fetchCategoriesSuccess', data)
        } catch (e) {
            commit('fetchCategoriesError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';


export default {
    async fetchsPageRecipes({ commit, rootGetters }, slug: string): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale']

        commit('fetchsPageRecipesInit')
        try {
            const { data } = await $axios.get(`${this.app.$config.apiURL}/new-api/shop/${locale}/pages/${slug}`)

            commit('fetchsPageRecipesSuccess', data)
        } catch(e: any) {
            commit('fetchsPageRecipesError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

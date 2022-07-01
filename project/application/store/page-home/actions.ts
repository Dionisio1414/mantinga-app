import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';


export default {
    async fetchHomepage({ commit, rootGetters }): Promise<void> {
        // @ts-ignore
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale']

        commit('fetchHomepageInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/shop/${locale}/pages/homepage`
            );
            commit('fetchHomepageSuccess', data)
        } catch (e) {
            commit('fetchHomepageError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

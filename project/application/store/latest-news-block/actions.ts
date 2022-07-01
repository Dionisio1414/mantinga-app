import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { IArticleGetParams } from '~/types/articles.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';

export default {
    async fetchLatestNews({ commit }, params?: IArticleGetParams): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        commit('fetchLatestNewsInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/articles`,
                { params }
            );
            commit('fetchLatestNewsSuccess', data)
        } catch (e) {
            commit('fetchLatestNewsError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

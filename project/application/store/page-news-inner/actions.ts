import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import httpErrorSerializer from '~/utils/http-error-serializer';


export default {
    async fetchNewsById({ commit }, id: number): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        commit('fetchNewsByIdInit')

        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/articles/${id}`,
            );
            commit('fetchNewsByIdSuccess', data)
        } catch (e) {
            commit('fetchNewsByIdError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

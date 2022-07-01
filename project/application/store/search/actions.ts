import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

import httpErrorSerializer from '~/utils/http-error-serializer';

export default {
    async search({ commit }, str: string): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        const params = {
            s: str,
            limit: 5,
            page: 1
        }
        commit('searchInit')

        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/search`,
                { params }
            );
            commit('searchSuccess', data)
        } catch (e) {
            commit('searchError', httpErrorSerializer(e))
        }
    },
    updateSearchStr({ commit }, searchStr: string): void {
        commit('updateSearchStr', searchStr)
    }
} as ActionTree<IState, IRootState>;

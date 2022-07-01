import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';


export default {
    async fetchCareerPage({ commit, rootGetters }, route: string): Promise<void> {
        // @ts-ignore
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale']

        commit('fetchCareerPageInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/shop/${locale}/pages/${route}`
            );
            commit('fetchCareerPageSuccess', data)
        } catch (e) {
            commit('fetchCareerPageError', httpErrorSerializer(e))
        }
    },
    async fetchJobs({ commit }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        commit('fetchJobsInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/jobs`
            );
            commit('fetchJobsSuccess', data)
        } catch (e) {
            commit('fetchJobsError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

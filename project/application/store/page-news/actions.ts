import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { IArticleGetParams } from '~/types/articles.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

import httpErrorSerializer from '~/utils/http-error-serializer';

export default {
    async fetchLatestProductNews({ commit }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        let timezone = this.app.$dayjs.tz.guess();
        if (timezone === 'UTC') {
            timezone = 'Europe/Vilnius'
        }

        commit('fetchLatestProductNewsInit')

        const params: IArticleGetParams = {
            type: 2,
            'order[date]': 'desc',
            'order[id]': 'desc',
            'date[before]': this.app.$dayjs().tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
            itemsPerPage: 4
        }
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/articles`,
                { params }
            );
            commit('fetchLatestProductNewsSuccess', data)
        } catch (e) {
            commit('fetchLatestProductNewsError', httpErrorSerializer(e))
        }
    },
    async fetchLatestCompanyNews({ commit }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        let timezone = this.app.$dayjs.tz.guess();
        if (timezone === 'UTC') {
            timezone = 'Europe/Vilnius'
        }

        commit('fetchLatestCompanyNewsInit')
        const params: IArticleGetParams = {
            type: 1,
            'order[date]': 'desc',
            'order[id]': 'desc',
            'date[before]': this.app.$dayjs().tz(timezone).format('YYYY-MM-DD HH:mm:ss'),
            itemsPerPage: 4
        }

        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/articles`,
                { params }
            );
            commit('fetchLatestCompanyNewsSuccess', data)
        } catch (e) {
            commit('fetchLatestCompanyNewsError', httpErrorSerializer(e))
        }
    },
    async fetchNewsPage({ commit, rootGetters }, slug: string): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale']

        commit('fetchNewsPageInit')
        try {
            const { data } = await $axios.get(`${this.app.$config.apiURL}/new-api/shop/${locale}/pages/${slug}`)

            commit('fetchNewsPageSuccess', data)
        } catch (e: any) {
            commit('fetchNewsPageError', httpErrorSerializer(e))
        }
    }
} as ActionTree<IState, IRootState>;

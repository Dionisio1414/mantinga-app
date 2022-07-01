import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

import { IRootState } from '~/store-utils/state.interface';

import { IState } from './state';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtCookies } from 'cookie-universal-nuxt';

export default {
    async fetchUserInfo({ commit, rootGetters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const $cookies: NuxtCookies = this.$cookies;
        const locale: string = rootGetters['locale/currentLocale']

        const config = {
            headers: { Authorization: `Bearer ${$cookies.get('authToken')}`}
        }

        commit('fetchUserInfoInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/secure/user/${locale}/account/show-info`,
                { ...config }
            );
            commit('fetchUserInfoSuccess', data)
        } catch (e) {
            commit('fetchUserInfoError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

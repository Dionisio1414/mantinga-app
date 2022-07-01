import { ActionTree } from 'vuex';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { NuxtCookies } from 'cookie-universal-nuxt';

import { IRootState } from '~/store-utils/state.interface';

import { IState } from './state';

export default {
    setToken({ commit }, payload: string) {
        const $axios: NuxtAxiosInstance = this.$axios;

        if (payload) {
            $axios.defaults.headers.Authorization = `Bearer ${payload}`;
            commit('setAuthFlag', true);
        } else {
            delete $axios.defaults.headers.Authorization;
            commit('setAuthFlag', false);
        }

        commit('setToken');
    },
    setTokenFromCookie({ dispatch }) {
        const $cookies: NuxtCookies = this.$cookies;

        const token = $cookies.get('authToken');

        dispatch('setToken', token);
    },
    clearToken({ commit }) {
        const $axios: NuxtAxiosInstance = this.$axios;
        const $cookies: NuxtCookies = this.$cookies;

        $cookies.remove('authToken', { path: '/' });
        delete $axios.defaults.headers.Authorization;
        commit('setAuthFlag', false);
    },
    logout({ dispatch }) {
        dispatch('clearToken');
    },
} as ActionTree<IState, IRootState>;

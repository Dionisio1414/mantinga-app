import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { mixinFormMapperActions } from '~/store-utils/form-mapper-mixins';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { AUTH_TOKEN_COOKIE_FILETIME } from '~/constants/auth';

import httpErrorSerializer from '~/utils/http-error-serializer';
import dayjs from 'dayjs';

export default {
    async login({ commit, getters, dispatch }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        const body = getters.form;

        commit('loginInit')
        try {
            dispatch('auth/clearToken', null, { root: true })

            const { data } = await $axios.post(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/login`,
                {
                    username: body.email,
                    password: body.password
                }
            );
            const token = data.token || ''

            this.$cookies.set(
                'authToken',
                token,
                {
                    expires: dayjs().add(AUTH_TOKEN_COOKIE_FILETIME).toDate(),
                    path: '/'
                },
            );

            dispatch('auth/setToken', data.token, { root: true })
            commit('loginSuccess', data)
        } catch (e) {
            commit('loginError', httpErrorSerializer(e))
        }
    },
    clearForm({ commit }) {
        commit('clearForm')
    },
    ...mixinFormMapperActions()
} as ActionTree<IState, IRootState>;

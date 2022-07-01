import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { mixinFormMapperActions } from '~/store-utils/form-mapper-mixins';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import httpErrorSerializer from '~/utils/http-error-serializer';

export default {
    async resetPassword({ commit, getters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        const { password, passwordConfirmation } = getters.form;
        const token = getters.token;

        commit('resetPasswordInit')
        try {

            const { data } = await $axios.post(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/forgotten-password/${token}`,
                {
                    sylius_user_reset_password: {
                        password: {
                            first: password,
                            second: passwordConfirmation
                        }
                    }
                }
            );

            commit('resetPasswordSuccess', data)
        } catch (e) {
            commit('resetPasswordError', httpErrorSerializer(e))
        }
    },
    setToken({ commit }, token: string): void {
        commit('setToken', token)
    },
    clearForm({ commit }) {
        commit('clearForm')
    },
    ...mixinFormMapperActions()
} as ActionTree<IState, IRootState>;

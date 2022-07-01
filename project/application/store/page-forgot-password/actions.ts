import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { mixinFormMapperActions } from '~/store-utils/form-mapper-mixins';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import httpErrorSerializer from '~/utils/http-error-serializer';

export default {
    async sendEmail({ commit, getters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        const { email } = getters.form;

        commit('sendEmailInit')
        try {

            const { data } = await $axios.post(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/forgot-password`,
                {
                    sylius_user_request_password_reset: { email }
                }
            );

            commit('sendEmailSuccess', data)
        } catch (e) {
            commit('sendEmailError', httpErrorSerializer(e))
        }
    },
    clearForm({ commit }) {
        commit('clearForm')
    },
    ...mixinFormMapperActions()
} as ActionTree<IState, IRootState>;

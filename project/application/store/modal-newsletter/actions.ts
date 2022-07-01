import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { mixinFormMapperActions } from '~/store-utils/form-mapper-mixins';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { saveEmailToStorage } from '~/store-utils/newsletter';
import httpErrorSerializer from '~/utils/http-error-serializer';

export default {
    async subscribeToNewsletter({ commit, getters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        const body = getters.form;

        commit('subscribeToNewsletterInit')
        try {
            const { data } = await $axios.post(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/newsletter/subscribe`,
                { ...body }
            );
            commit('subscribeToNewsletterSuccess', data)

            saveEmailToStorage(body.email);
        } catch (e) {
            commit('subscribeToNewsletterError', httpErrorSerializer(e))
        }
    },
    clearForm({ commit }) {
        commit('clearForm')
    },
    ...mixinFormMapperActions()
} as ActionTree<IState, IRootState>;

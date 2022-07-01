import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { mixinFormMapperActions } from '~/store-utils/form-mapper-mixins';


export default {
    async fetchOffer({ commit }, id: number): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        commit('fetchOfferInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/jobs/${id}`
            );
            commit('fetchOfferSuccess', data)
        } catch (e) {
            commit('fetchOfferError', httpErrorSerializer(e))
        }
    },
    async sendJobInquiry({ commit, getters, rootGetters }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        const body = { ...getters.form }

        body.locale = rootGetters['locale/currentLocale'];
        body.job = getters.offer.id;

        if (body.file) {
            const formData = new FormData();

            formData.append(body.file, body.file.name || 'file')

            body.file = formData;
        }

        commit('sendJobInquiryInit')
        try {
            const { data } = await $axios.post(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/jobs/inquiry`,
                { ...body }
            );
            commit('sendJobInquirySuccess', data)
        } catch (e) {
            commit('sendJobInquiryError', httpErrorSerializer(e))
        }
    },
    clearForm({ commit }) {
        commit('clearForm')
    },
    ...mixinFormMapperActions()
} as ActionTree<IState, IRootState>;

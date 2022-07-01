import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { mixinFormMapperActions } from '~/store-utils/form-mapper-mixins';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { saveEmailToStorage } from '~/store-utils/newsletter';

export default {
    async productInquiry({ commit, getters, rootGetters }, id: number): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        const body = { ...getters.form };
        body['products[]'] = id
        body.locale = rootGetters['locale/currentLocale'];

        const formData = new FormData();
        for(const key in body) {
            if(typeof body[key] !== 'boolean' && !body[key]) continue
            formData.append(key, body[key]);
        }

        commit('productInquiryInit')
        try {
            const { data } = await $axios.post(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/product/product-inquiry`,
                formData
            );
            commit('productInquirySuccess', data)

            saveEmailToStorage(body.email);
        } catch (e) {
            commit('productInquiryError', e)
        }
    },
    clearForm({ commit }) {
        commit('clearForm')
    },
    ...mixinFormMapperActions()
} as ActionTree<IState, IRootState>;

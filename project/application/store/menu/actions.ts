import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export default {
    async fetchMenuList({ commit }) {
        const $axios: NuxtAxiosInstance = this.$axios;
        
        try {
            commit('FETCH_MENU');
            const { data } = await $axios.get(
                `${this.app.$config.apiURL}/mantinga-api/lt/shop-menu/all`
            );
            commit('FETCH_MENU_SUCCESS', data);
        } catch (e: any) {
            commit('FETCH_MENU_ERROR', e?.response?.data);
        }
    },
} as ActionTree<IState, IRootState>;

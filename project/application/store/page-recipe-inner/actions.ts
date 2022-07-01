import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

export default {
    async fetchRecipeInner({ commit }, id: number): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        commit('fetchRecipeInnerInit')
        try {
            const { data } = await $axios.get(`${this.app.$config.apiURL}/new-api/recipes/${id}`)

            commit('fetchRecipeInnerSuccess', data)
        } catch(e: any) {
            commit('fetchRecipeInnerError', httpErrorSerializer(e))
        }
    },
    async downloadRecipe({ commit, rootGetters }, id: number): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale'];
      
        commit('downloadRecipeInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/presentation/${locale}/recipe/${id}`, { responseType: 'blob' },
            );
            const element = document.createElement('a')
            element.href = (window.URL || window.webkitURL).createObjectURL(
                new Blob([data], { type: 'application/pdf' })
            )
            element.setAttribute('download', '')
            element.click()
            commit('downloadRecipeSuccess')

        } catch (e) {
            commit('downloadRecipeError', httpErrorSerializer(e))
        }
    }
} as ActionTree<IState, IRootState>;

import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import httpErrorSerializer from '~/utils/http-error-serializer';
import { NuxtAxiosInstance } from '@nuxtjs/axios';
import { ISubcategoryPageForm } from '~/types/subcategory-page.interface';
import { mixinFormMapperActions } from '~/store-utils/form-mapper-mixins';
import { IUpdateFieldPayload } from '~/types/forms/update-field-payload.interface';
import { IDictionary } from '~/types/dictionary.interface';


export default {
    async fetchSubcategory({ commit, rootGetters, getters }, slug: string): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;
        const locale: string = rootGetters['locale/currentLocale']

        const params: ISubcategoryPageForm = {
            ...getters.sendForm,
        }

        commit('fetchSubcategoryInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/mantinga-api/product/${locale}/sub-category-page/${slug}`,
                { params }
            );
            commit('fetchSubcategorySuccess', data)
        } catch (e) {
            commit('fetchSubcategoryError', httpErrorSerializer(e))
        }
    },
    updateForm({ commit }, payload: IUpdateFieldPayload<any>): void {
        commit('updateForm', payload);

    },
    setSlugs({ commit }, payload: IDictionary<string>): void {
        commit('setSlugs', payload)
    },
    ...mixinFormMapperActions()
} as ActionTree<IState, IRootState>;

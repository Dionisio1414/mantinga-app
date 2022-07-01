import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';
import { NuxtAxiosInstance } from '@nuxtjs/axios';

import httpErrorSerializer from "~/utils/http-error-serializer";
import { IProjectsGetParams } from '~/types/projects.interface';


export default {
    async fetchProjects({ commit }): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios
        const params: IProjectsGetParams = {
            'order[date]': 'desc',
            'order[id]': 'desc',
        }

        commit('fetchProjectsInit')
        try {
            const { data } = await $axios.get(
                // @ts-ignore
                `${this.app.$config.apiURL}/new-api/projects`,
                { params }
            );

            commit('fetchProjectsSuccess', data)
        } catch (e: any) {
            commit('fetchProjectsError', httpErrorSerializer(e))
        }
    },
    async fetchProjectsInner({ commit }, slug: string): Promise<void> {
        const $axios: NuxtAxiosInstance = this.$axios;

        commit('fetchProjectsInnerInit')
        try {
            const { data } = await $axios.get(`${this.app.$config.apiURL}/new-api/projects/${slug}`)
            commit('fetchProjectsInnerSuccess', data)
        } catch (e: any) {
            commit('fetchProjectsInnerError', httpErrorSerializer(e))
        }
    },
} as ActionTree<IState, IRootState>;

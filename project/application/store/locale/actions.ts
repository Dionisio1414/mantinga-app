import { ActionTree } from 'vuex';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

const LOCALE_STORAGE_KEY = 'locale';

export default {
    checkUserLocale({ dispatch }) {
        // @ts-ignore
        const locale = window.localStorage.getItem(LOCALE_STORAGE_KEY) || this.app.i18n.locale;
        dispatch('updateLocale', locale)
    },
    updateLocale({ commit }, locale: string) {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
        // @ts-ignore
        this.app.i18n.setLocale(locale);

        commit('UPDATE_CURRENT_LOCALE', locale)
    }
} as ActionTree<IState, IRootState>;

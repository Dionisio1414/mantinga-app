import { ActionTree } from 'vuex';
import Bowser from 'bowser';

import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

import BROWSER_RULES from '~/constants/browser-rules';
import httpErrorSerializer from '~/utils/http-error-serializer';

export default {
    checkSupport({ commit }) {
        try {
            const userAgent: string = this.app.$device.userAgent;
            const browser: Bowser.Parser.Parser = Bowser.getParser(userAgent);

            const result: boolean | undefined = browser.satisfies(BROWSER_RULES);

            if (result === undefined) {
                commit('SET_SUPPORTED_FLAG', true);
                return;
            }

            commit('SET_SUPPORTED_FLAG', result);
        } catch (error) {
            commit('SET_ERROR', httpErrorSerializer(error));
        }
    }
} as ActionTree<IState, IRootState>;

import { MutationTree } from 'vuex';

import { IState } from './state';

export default {
    UPDATE_CURRENT_LOCALE: (state, payload: string) => {
        state.currentLocale = payload;
    },
} as MutationTree<IState>;

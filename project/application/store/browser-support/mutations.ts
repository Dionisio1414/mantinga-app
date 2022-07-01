import { MutationTree } from 'vuex';

import { IState } from './state';

export default {
    SET_SUPPORTED_FLAG: (state, flag: boolean) => {
        state.supported = flag;
    },
    SET_ERROR: (state, error: any) => {
        state.error = error;
    }
} as MutationTree<IState>;

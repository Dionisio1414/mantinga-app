import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    setToken: (state) => {
        state.status = EStatus.SUCCESS;
    },
    setAuthFlag: (state, flag: boolean) => {
        state.isAuthorized = flag;
    }
} as MutationTree<IState>;

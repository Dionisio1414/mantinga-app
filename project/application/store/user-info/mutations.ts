import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IUserInfo } from '~/types/user-info.interface';
import { IState } from './state';

export default {
    fetchUserInfoInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchUserInfoSuccess: (state, data: IUserInfo) => {
        state.userInfo = data;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchUserInfoError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
} as MutationTree<IState>;

import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { mixinFormMapperMutations } from '~/store-utils/form-mapper-mixins';

import { IState } from './state';

export default {
    resetPasswordInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    resetPasswordSuccess: (state) => {
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    resetPasswordError: (state, payload: any) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    clearForm: (state) => {
        state.status = EStatus.INIT;
        state.error = null;
        state.form = {
            password: '',
            passwordConfirmation: ''
        }
        state.token = ''
    },
    setToken: (state, token: string) => {
        state.token = token;
    },
    ...mixinFormMapperMutations()
} as MutationTree<IState>;

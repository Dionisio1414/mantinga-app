import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IState } from './state';

export default {
    fetchProductsInit: state => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchProductsSuccess: (state, payload) => {
        state.products = payload['hydra:member'];
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchProductsError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },

} as MutationTree<IState>;

import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    },
    offer: state => {
        return state.offer
    },
    form: state => {
        return state.form
    },
    message: state => {
        return state.message
    }
} as GetterTree<IState, IRootState>;

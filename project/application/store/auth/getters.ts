import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    isAuthorized: state => {
        return state.isAuthorized;
    },
} as GetterTree<IState, IRootState>;

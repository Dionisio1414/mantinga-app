import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    isSupported: state => {
        return state.supported;
    }
} as GetterTree<IState, IRootState>;

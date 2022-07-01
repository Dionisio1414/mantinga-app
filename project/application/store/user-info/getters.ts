import { GetterTree } from 'vuex';
import { IRootState } from '~/store-utils/state.interface';
import { IState } from './state';

export default {
    userInfo: state => {
        return state.userInfo;
    },
} as GetterTree<IState, IRootState>;

import { GetterTree } from 'vuex';
import { IState } from './state';
import { IRootState } from '~/store-utils/state.interface';

export default {
    projectsList: state => {
        return state.projects;
    },
    projectInner: state => {
        return state.projectsInner;
    },
    status: state => {
        return state.status
    },
    error: state => {
        return state.error
    }
} as GetterTree<IState, IRootState>;

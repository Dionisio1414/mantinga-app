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
    category: state => {
        return state.category
    },
    subcategories: state => {
        return state.subcategories
    },
    breadcrumbs: state => {
        return state.breadcrumbs
    },
    pageName: state => {
        return state.pageName
    },
    pageDescription: state => {
        return state.pageDescription
    },
    subcategoriesForLayout: state => {
        return state.subcategoriesForLayout
    }
} as GetterTree<IState, IRootState>;

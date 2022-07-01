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
    breadcrumbs: state => {
        return state.breadcrumbs
    },
    pageName: state => {
        return state.pageName
    },
    pageDescription: state => {
        return state.pageDescription
    },
    filters: state => {
        return state.filters
    },
    form: state => {
        return state.form
    },
    products: state => {
        return state.products
    },
    pagination: state => {
        return state.pagination
    },
    sendForm: (state) => {
        const obj: any = {
            page: state.pagination.page,
            limit: state.pagination.itemsPerPage,
            sort: state.form.sort,
            order_by: state.form.order_by
        }

        for (const key in state.filters) {
            // @ts-ignore
            if(state.form[key]) obj[`attributes[${key}][]`] = state.form[key]
        }
        return obj
    },
    slugs: (state) => {
        return state.slugs
    },
    image: (state) => {
        return state.image
    },
    sorts: state => {
        return state.sorts
    }
} as GetterTree<IState, IRootState>;

import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { mixinFormMapperMutations } from '~/store-utils/form-mapper-mixins';
import { ICategoryPageResponse } from '~/types/category-page.interface';
import { IDictionary } from '~/types/dictionary.interface';
import { ISubcategoryPageForm } from '~/types/subcategory-page.interface';

import { IState } from './state';

export default {
    fetchSubcategoryInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchSubcategorySuccess: (state, { breadcrumbs, filters, products, taxon, sorts }: ICategoryPageResponse) => {
        state.breadcrumbs = breadcrumbs || []
        state.pageName = taxon?.name || '';
        state.pageDescription = taxon?.description || '';
        state.filters = filters || {}
        state.image = taxon?.image[0]?.absolute_path || ''
        state.sorts = sorts;

        if (products.page !== +state.pagination.page) {
            state.products = [...state.products, ...products?.products] || []
        } else {
            state.products = products?.products || []
        }

        state.pagination = {
            page: products.page,
            itemsPerPage: products.limitPerPage,
            totalItems: products.totalItems,
            pages: products.pages
        }

        state.form.page = products?.page;

        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchSubcategoryError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    updateForm: (state, form: ISubcategoryPageForm) => {
        state.form = { ...form }
    },
    setSlugs: (state, { category, subcategory }: IDictionary<string>) => {
        state.slugs = {
            category,
            subcategory
        }
    },
    ...mixinFormMapperMutations()
} as MutationTree<IState>;

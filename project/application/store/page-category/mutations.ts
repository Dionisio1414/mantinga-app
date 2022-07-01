import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { ICategoryPageProduct } from '~/types/category-page.interface';

import { IState } from './state';

export default {
    fetchCategoryInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING
    },
    fetchCategorySuccess: (state, data: any) => {
        state.subcategories = data?.taxon?.children || [];
        state.breadcrumbs = data?.breadcrumbs || []
        state.pageName = data?.taxon?.name || '';
        state.pageDescription = data?.taxon?.description || '';
        state.subcategoriesForLayout = [
            {
                name: state.subcategories[0]?.name,
                slug: data?.taxon?.slug,
                subSlug: state.subcategories[0]?.slug,
                image: state.subcategories[0]?.image[0]?.absolute_path || '',
                products: data.products?.products.filter((p: ICategoryPageProduct) => p.category.code === data.taxon?.children[0]?.code)
            },
            {
                name: state.subcategories[1]?.name,
                slug: data?.taxon?.slug,
                subSlug: state.subcategories[1]?.slug,
                image: state.subcategories[0]?.image[0]?.absolute_path || '',
                products: data.products?.products.filter((p: ICategoryPageProduct) => p.category.code === data.taxon?.children[1]?.code)
            }
        ]
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchCategoryError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
} as MutationTree<IState>;

import { EStatus } from "~/constants/status";
import { ICategoryPageBreadcrumb, ICategoryPageProduct, ICategoryPageSubcategoryForLayout } from "~/types/category-page.interface";
import { IDictionary } from "~/types/dictionary.interface";
import { IPagination } from "~/types/pagination.interface";
import { ITaxon, ISubTaxon } from "~/types/taxons";

export interface IState {
    status: EStatus;
    error: Error | null;
    category: ITaxon[];
    subcategories: ISubTaxon[];
    breadcrumbs: ICategoryPageBreadcrumb[];
    pageName: string;
    pageDescription: string;
    subcategoriesForLayout: ICategoryPageSubcategoryForLayout[];
    filters: any;
    form: IDictionary<string | number>;
    products: ICategoryPageProduct[];
    pagination: IPagination;
    slugs: {
        category: string;
        subcategory: string;
    },
    image: string;
    sorts: string[];
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: null,
        category: [],
        subcategories: [],
        breadcrumbs: [],
        pageName: '',
        pageDescription: '',
        subcategoriesForLayout: [],
        filters: {},
        form: {
            page: 1,
            sort: 'desc',
            order_by: ''
        },
        products: [],
        pagination: {
            page: 1,
            itemsPerPage: 48,
            totalItems: 0,
            pages: 1
        },
        slugs: {
            category: '',
            subcategory: ''
        },
        image: '',
        sorts: []
    };
}

import { EStatus } from "~/constants/status";
import { ICategoryPageBreadcrumb, ICategoryPageSubcategoryForLayout } from "~/types/category-page.interface";
import { ITaxon, ISubTaxon } from "~/types/taxons";

export interface IState {
    status: EStatus;
    error: Error | null;
    category: ITaxon[];
    subcategories: ISubTaxon[];
    breadcrumbs: ICategoryPageBreadcrumb[];
    pageName: string;
    subcategoriesForLayout: ICategoryPageSubcategoryForLayout[];
    pageDescription: string;
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: null,
        category: [],
        subcategories: [],
        breadcrumbs: [],
        pageName: '',
        subcategoriesForLayout: [],
        pageDescription: ''
    };
}

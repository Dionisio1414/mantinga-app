import { IDictionary } from "./dictionary.interface";
import { IProductBadge } from "./product.interface";
import { ITaxon } from "./taxons";

export interface ICategoryPageBreadcrumb {
    id: number;
    name: string;
    parentId: number | null;
    slug: string;
}

export interface ICategoryPageProduct {
    category: {
        code: string;
        id: number;
        name: string;
        parentName: string | null;
        slug: string;
    };
    description: string;
    id: number;
    image: string;
    name: string;
    presentation: string;
    personaities: [];
    price: null;
    productBadges: IProductBadge[];
    productCode: string;
    shortDescription: string;
    slug: string;
    status: number;
    translations: string[]
}

export interface ICategoryPageProducts {
    limitPerPage: number;
    page: number;
    pages: number;
    products: ICategoryPageProduct[];
    totalItems: number;
}

export interface ICategoryPageFilterValue {
    count: number;
    type: string;
    value: string;
}
export interface ICategoryPageFilter {
    name: string;
    values: IDictionary<ICategoryPageFilterValue>
}

export interface ICategoryPageResponse {
    breadcrumbs: ICategoryPageBreadcrumb[]
    filters: IDictionary<ICategoryPageFilter>
    products: ICategoryPageProducts
    taxon: ITaxon
    sorts: string[]
}

export interface ICategoryPageSubcategoryForLayout {
    name: string;
    slug: string;
    subSlug: string;
    products: ICategoryPageProduct[];
    image: string
}
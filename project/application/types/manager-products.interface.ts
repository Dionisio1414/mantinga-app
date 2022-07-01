import { EProductStatus } from "~/constants/product-status";
import { IProductBadge } from "./product.interface";
import { ITaxon } from "./taxons";

export interface IManagerProduct {
    category: ITaxon;
    description: string | null;
    id: number;
    image: string;
    name: string;
    personalities: [];
    presentation: string;
    price: null;
    productBadges: IProductBadge[];
    productCode: string;
    shortDescription: string | null;
    slug: string;
    status: number;
    translations: string[]
}

export interface ILocaleFilter {
    code: string;
    createdAt: string;
    id: number;
    updatedAt: string;
}

export interface IManagerFilters {
    locales: ILocaleFilter[];
    status: number[]
}

export interface IManagerProductsResponse {
    filters: {};
    'man-filters': IManagerFilters;
    products: {
        limitPerPage: number;
        page: number;
        pages: number;
        totalItems: number;
        products: IManagerProduct[]
    };
    taxons: ITaxon[]
}

export interface IManagerProductsGetParams {
    name?: string;
    code?: string,
    status?: EProductStatus,
    product_taxons?: string,
    locale_codes?: string[] | string,
    limit?: number,
    page?: number
}
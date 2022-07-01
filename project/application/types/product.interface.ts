/* eslint-disable no-use-before-define */
export interface IAttribute {
    name: string;
    value: string;
    code: string;
}

export interface IProductImage {
    path: {
        medium: string;
        original: string;
        small: string;
    };
    type: string;
}

export interface IProduct {
    associations: [];
    attributes: IAttribute[];
    breadcrumbs: string | null;
    comingSoonBadge: boolean;
    description: string;
    discountBadge: boolean;
    forwardTraidingBadge: boolean;
    id: number;
    images: IProductImage[];
    inStock: boolean;
    metaDescription: string;
    metaTitle: string;
    name: string;
    newBadge: boolean;
    pdf: string;
    personalities: [];
    productCode: string;
    seriesBadge: boolean;
    shortDescription: string;
    slug: string;
    video: string;
    productBadges: IProductBadge[]
    status: number;
    translations: string[];
    category: IProductCategory
}

export interface IProductCategory {
    id: number;
    name: string;
    parentId: number;
    slug: string;
}

export interface IProductBadge {
    image: string;
    name: string;
    primary: boolean;
}
export interface ISimilarProductsResponse {
    page: number;
    pages: number;
    totalItems: number;
    limitPerPage: number;
    products: {
        page: number;
        limitPerPage: number;
        pages: number;
        totalItems: number;
        products: IProductCard[]
    };
}
export interface IProductCard {
    comingSoonBadge: boolean;
    description: string;
    discountBadge: boolean;
    forwardTraidingBadge: boolean;
    id: number;
    image: string;
    inStock: boolean;
    name: string;
    personalities: [];
    newBadge: boolean;
    price: string;
    productCode: string;
    seriesBadge: boolean;
    shortDescription: string;
    slug: string;
    productBadges: IProductBadge[]
}
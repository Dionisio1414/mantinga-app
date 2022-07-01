import { IManagerProduct } from "./manager-products.interface";

export interface IPresentationBuilderSubcategory {
    code: string;
    description: string | null;
    id: number;
    image: [];
    name: string;
    parentName: string;
    products: IManagerProduct[];
    slug: string;
}

export interface IPresentationBuilderCategory {
    children: IPresentationBuilderSubcategory[];
    code: string;
    description: string;
    id: number;
    image: string;
    name: string;
    parentName: string | null;
    slug: string;
}


export interface IChangeCategoryPositionPayload {
    direction: string;
    oldIndex: number;
}

export interface IChangeProductPositionPayload {
    direction: string;
    index: number;
    subcategoryIndex: number;
    categoryId: number;
}

export interface IDeleteProductPayload {
    id: number;
    categoryId: number;
}
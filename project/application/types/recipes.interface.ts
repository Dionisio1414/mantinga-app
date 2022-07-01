/* eslint-disable no-use-before-define */
import { IDictionary } from "./dictionary.interface";

export interface IRecipeTranslation {
    '@id': string;
    '@type': string;
    id: number;
    locale: string;
    metaDescription: string;
    metaKeywords: string;
    name: string;
    slug: string;
    translatable: number;
}

export interface IRecipeImage {
    '@id': string;
    '@type': string;
    file: null;
    id: number;
    owner: string;
    path: string;
    type: null;
}
export interface IRecipe {
    '@id': string;
    '@type': string;
    category: IRecipeCategory;
    contentTypes: [];
    cookingTimeMinutes: number;
    createdAt: string;
    id: number;
    images: string[];
    maxServings: number;
    minServings: number;
    products: IDictionary<string>;
    translations: IDictionary<any>;
    video: string;
}

export interface IRecipeMapping {
    '@type': string;
    property: string;
    required: boolean;
    variable: string;
}
export interface IRecipeSearch {
    '@type': string;
    'hydra:template': string;
    'hydra:variableRepresentation': string;
    'hydra:mapping': IRecipeMapping[]
}
export interface IRecipeResponse {
    '@context': string;
    '@id': string;
    '@type': string;
    'hydra:member': IRecipe[];
    'hydra:search': IRecipeSearch;
    'hydra:totalItems': number;
}
export interface IRecipeCategory {
    '@id': string;
    '@type': string;
    id: number;
    name: string;
    recipes: IRecipe[];
    slug: string;
    translation: IRecipeTranslation;
    translations: IDictionary<IRecipeTranslation>
}

export interface IRecipeGetParams {
    'cookingTime'?: string | number | null;
    'order[cookingTimeMinutes]'?: string;
    'order[date]'?: string;
    'order[id]'?: string;
    'cookingTimeMinutes[between]'?: string | null;
    'cookingTimeMinutes[gt]'?: string | null;
    'cookingTimeMinutes[gte]'?: string | null;
    'cookingTimeMinutes[lt]'?: string | null;
    'cookingTimeMinutes[lte]'?: string | null;
    'products.id'?: number | number[] | null;
    'products.id[]'?: number[];
    'category.id'?: number | number[] | null;
    'category_id'?: number | number[] | null; 
    'products_id'?: number | number[] | null; 
    'category.id[]'?: number[];
    page?: string | number;
    itemsPerPage?: number;
}


export interface IRecipeTimesGetParams {
    'order[position]'?: string;
    'order[createdAt]'?: string;
    page?:  string | number;
    itemsPerPage?: string;
}

export interface IRecipeCategories {
    '@id': string;
    '@type': string;
    id: number;
    position: number;
    translations: IDictionary<IRecipeCategoriesTranslation>
}

export interface IRecipeTimes {
    "@type": string;
    "@id": string;
    id: number;
    position: number;
    filterType: string;
    time: number;
    parameterName: string;
    translations: IDictionary<IRecipeTimesTranslation>
}

export interface IRecipeTimesTranslation {
    "@type": string;
    "@id": string;
    id: number;
    name: string;
}

export interface IRecipeCategoriesTranslation {
    '@id': string;
    '@type': string;
    id: number;
    name: string;
    slug: string;
    metaKeywords: string | null;
    metaDescription: string | null;
}

export interface IRecipesMultiselectList {
    id: number;
    title: string;
    type?: string;
}

export interface IRecipeInner {
    '@id': string;
    '@type': string;
    category: IRecipeCategories;
    contentTypes: [];
    cookingTimeMinutes: number;
    id: number;
    images: string[];
    maxServings: number;
    minServings: number;
    products: IRecipeInnerProduct[];
    translations: IDictionary<IRecipeCategoriesTranslation>;
    video: string;
    date: string | null;
}

export interface IRecipeInnerProduct {
    "@context": string;
    "@id": string;
    "@type": string;
    productTaxons: [];
    mainTaxon: null;
    reviews: [];
    images: string[];
    id: number;
    code: string,
    variants: [];
    options: [];
    createdAt: string;
    updatedAt: string;
    translations: IDictionary<IRecipeTranslation | IRecipeProductTranslations>;
}

export interface IRecipeCategoriesTranslation {
    '@id': string;
    '@type': string;
    id: number;
    name: string;
    slug: string;
    metaKeywords: string | null;
    metaDescription: string | null;
    steps: string[] | [];
    ingredients: string[] | [];
    contentType: [];
}
export interface IRecipesPayloadPaginate {
    params?: IRecipeGetParams,
    paginate?: boolean
}

export interface IRecipeProductTranslations {
    "@id": string;
    "@type": string;
    id: number;
    name: string;
    slug: string;
}

export interface IMeta {
    property?: string;
    content: string;
    hid?: string;
    name?: string;
}

export interface IProjectMeta {
    title: string;
    meta: IMeta[]
}
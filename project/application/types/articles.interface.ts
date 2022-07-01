import { IContentType } from "./content-type.interface";
import { IDictionary } from "./dictionary.interface";

export interface IArticleTranslation {
    '@id': string;
    '@type': string;
    contentType: IContentType[];
    metaDescription: string;
    metaKeywords: string;
    name: string;
    shortDescription: string;
    slug: string;
}

export interface IArticle {
    '@id': string;
    '@type': string;
    contentTypes: IContentType[];
    date: string;
    id: number;
    image: string;
    metaDesctiption: string;
    metaKeywords: string;
    name: string;
    shortDescription: string;
    slug: string;
    translations: IDictionary<IArticleTranslation>;
    type: number;
}

export interface IArticleMapping {
    '@type': string;
    property: string;
    required: boolean;
    variable: string;
}

export interface IArticleResponse {
    // items: IArticle[];
    '@context': string;
    '@id': string;
    '@type': string;
    'hydra:member': IArticle[];
    'hydra:search': {
        '@type': string;
        'hydra:template': string;
        'hydra:variableRepresentation': string;
        'hydra:mapping': []
    };
    'hydra:view': {
        '@id': string;
        '@type': string;
    };
    'hydra:totalItems': number;
}

export interface IArticleGetParams {
    'date[before]'?: string;
    'date[stricly_before]'?: string;
    'date[after]'?: string;
    'date[stricly_after]'?: string;
    'order[date]'?: string;
    'order[id]'?: string;
    type?: string | number | null;
    page?: string | number;
    itemsPerPage?: string | number;
}

import { IContentType } from "./content-type.interface";
import { IDictionary } from "./dictionary.interface";

export interface IProjectsTranslation {
    '@id': string;
    '@type': string;
    contentType: IContentType[];
    metaDescription: string;
    metaKeywords: string;
    name: string;
    shortDescription: string;
    slug: string;
}

export interface IProjects {
    '@id': string;
    '@type': string;
    contentTypes: IContentType[];
    date: string;
    id: number;
    image: string;
    metaDescription: string;
    metaKeywords: string;
    name: string;
    shortDescription: string;
    slug: string;
    translations: IDictionary<IProjectsTranslation>;
    type: number;
}

export interface IProjectsResponse {
    '@context': string;
    '@id': string;
    '@type': string;
    'hydra:member': IProjects[];
    'hydra:search': {
        '@type': string;
        'hydra:template': string;
        'hydra:variableRepresentation': string;
        'hydra:mapping': IProjectsResponseMapping[]
    };
    'hydra:totalItems': number;
}

export interface IProjectsResponseMapping {
    "@type": string;
    variable: string;
    property: string;
    required: boolean;
}

export interface IProjectsGetParams {
    'order[date]'?: string;
    'order[id]'?: string;
    page?: string | number;
    itemsPerPage?: string | number;
}

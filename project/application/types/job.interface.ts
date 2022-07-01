/* eslint-disable no-use-before-define */
import { IContentType } from "./content-type.interface";
import { IDictionary } from "./dictionary.interface";

export interface IJob {
    '@id': string;
    '@type': string;
    contentTypes: IContentType[];
    createdAt: string;
    id: number;
    name: string;
    translations: IDictionary<IContentType>;
}

export interface ISearchJob {
    '@type': string;
    'hydra:mapping': any;
    'hydra:template': string;
    'hydra:variableRepresentation': string;
}

export interface IJobsResponse {
    '@context': string;
    '@id': string;
    '@type': string;
    'hydra:member': IJob[];
    'hydra:search': ISearchJob[];
    'hydra:totalItems': number;
}
export interface IOfferTranslation {
    '@context': string;
    '@id': string;
    '@type': string;
    contentType: IContentType[];
    id: number;
    metaDescription?: string;
    metaKeywords?: string;
    name: string;
    slug: string;
}

export interface IOfferResponse {
    '@context': string;
    '@id': string;
    '@type': string;
    contentTypes: IContenTypeJobUnit[];
    createdAt: string;
    id: number;
    name: string;
    translations: IDictionary<IOfferTranslation>
}

export interface IContenTypeJobUnit {
    code: string;
    properties: IContentTypeJobUnitProperties;
}

export interface IContentTypeJobUnitProperties {
    blocks: {
        value: IJobUnitBlock[];
    };
    title: {
        value: string;
    }
}

export interface IJobUnitBlock {
    title: {
        value: string
    }
}

export interface IJobForm {
    name: string;
    phone?: string;
    email: string;
    message: string;
    locale: string;
    job?: number | null;
    file?: FormData | null;
}
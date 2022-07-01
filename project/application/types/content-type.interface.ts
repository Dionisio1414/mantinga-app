import { EContentTypes } from '~/constants/content-types';
import { IDictionary } from './dictionary.interface';

export interface IContentType {
    code: EContentTypes;
    properties: IDictionary<any>;
}

export interface IContentTypeTranslated {
    '@context': {
        '@vocab': string;
        code: string;
        contentTypes: string;
        hydra: string;
        id: string;
        name: string;
        slug: string;
    },
    '@id': string;
    '@type': string;
    contentType: IContentType[];
    id: number;
    name: string;
    slug: string;
    title?: string;
    metaDescription?: string;
    metaKeywords?: string;
}
export interface IContentTypeResponse {
    '@context': {
        '@vocab': string;
        code: string;
        contentTypes: string;
        hydra: string;
        id: string;
        translations: string;
    },
    '@id': string;
    '@type': string;
    contentTypes: IContentType[];
    id: string;
    code: string;
    translations: IDictionary<IContentTypeTranslated>;
}


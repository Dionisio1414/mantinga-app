export interface IContentTypeFactsBlocks {
    title: IContentTypeFactsValue;
    subtitle: IContentTypeFactsValue;
    image: IContentTypeFactsImage;
}

export interface IContentTypeFactsValue {
    value: string;
}

export interface IContentTypeFactsImage {
    url: string;
}

export interface IContentTypeFactsProperties {
    headline: IContentTypeFactsValue;
    blocks: {
        value: IContentTypeFactsBlocks[]
    };
}

export interface IContentTypeFacts {
    code: string;
    properties: IContentTypeFactsProperties;
}
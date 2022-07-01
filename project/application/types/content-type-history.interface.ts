export interface IContentTypeHistoryBlocks {
    title: IContentTypeHistoryValue;
    subtitle: IContentTypeHistoryValue;
    image: IContentTypeHistoryImage;
}

export interface IContentTypeHistoryValue {
    value: string;
}

export interface IContentTypeHistoryImage {
    url: string;
}

export interface IContentTypeHistoryProperties {
    headline: IContentTypeHistoryValue;
    blocks: {
        value: IContentTypeHistoryBlocks[]
    };
}

export interface IContentTypeHistory {
    code: string;
    properties: IContentTypeHistoryProperties;
}
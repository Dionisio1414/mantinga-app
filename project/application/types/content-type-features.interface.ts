export interface IContentTypeFeaturesBlocks {
    title: IContentTypeFeaturesValue;
    subtitle: IContentTypeFeaturesValue
}

export interface IContentTypeFeaturesValue {
    value: string;
}

export interface IContentTypeFeaturesProperties {
    headline: IContentTypeFeaturesValue;
    blocks: {
        value: IContentTypeFeaturesBlocks[]
    };
}

export interface IContentTypeFeatures {
    code: string;
    properties: IContentTypeFeaturesProperties;
}
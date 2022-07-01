export interface IH2BlockProperties {
    title: {
        value: string;
    };
    alt: {
        value: string;
    };
    image: {
        url: string;
    }
}

export interface IH2Block {
    code: string;
    properties: IH2BlockProperties;
}
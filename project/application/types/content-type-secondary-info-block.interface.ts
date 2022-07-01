export interface ISecondaryInfoBlockItem {
    text: {
        value: string;
    };
    title: {
        value: string;
    }
}

export interface ISecondaryInfoBlockProperties {
    blocks: {
        value: ISecondaryInfoBlockItem[]
    };
    columns: {
        value: string
    }
}

export interface ISecondaryInfoBlock {
    code: string;
    properties: ISecondaryInfoBlockProperties;
}
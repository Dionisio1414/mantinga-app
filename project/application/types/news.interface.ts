export interface IMeta {
    property?: string;
    content: string;
    hid?: string;
    name?: string;
}

export interface INewsMeta {
    title: string;
    meta: IMeta[]
}
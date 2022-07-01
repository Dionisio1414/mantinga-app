export interface ITaxonImage {
    absolute_path: string;
}
export interface ISubTaxon {
    code: string;
    description: string | null;
    id: number;
    name: string;
    parentName: string;
    slug: string;
    image: ITaxonImage[]
}
export interface ITaxon {
    children: ISubTaxon[];
    code: string;
    description: string | null;
    id: number;
    name: string;
    parentName: string;
    slug: string;
    image: ITaxonImage[]
}

export interface ITaxonResponse {
    items: ITaxon[]
}
export interface ITaxonSelect {
    name: string;
    value: string;
}
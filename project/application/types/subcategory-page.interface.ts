import { IDictionary } from "./dictionary.interface";

export interface ISubcategoryPageFilterValue {
    count: number;
    type: string;
    value: string;
}

export interface ISubcategoryPageFilter {
    name: string;
    values: IDictionary<ISubcategoryPageFilterValue>
}

export interface ISubcategoryPageForm {
    page?: number;
    order_by: string;
    sort: string;
}
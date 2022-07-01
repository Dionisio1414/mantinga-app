export enum ECookingTime {
    TO_FIFTEEN_MINUTES = 'to_fifteen_minutes',
    TO_THIRTY_MINUTES = 'to_thirty_minutes',
    TO_SIXTY_MINUTES = 'to_sixty_minutes',
    FROM_THIRTY_MINUTES = 'from_thirty_minutes',
    ALL = 'all'
}

export enum ECookingTimesType {
    GT = 'gt',
    GTE = 'gte',
    LT = 'lt',
    LTE = 'lte'
}

export interface ICookingFilterOptions {
    id: string | number;
    gte: number | null;
    lte: number | null;
    label: string;
}

export const COOKING_FILTER_OPTIONS: ICookingFilterOptions[] = [
    { id: -1, gte: null, lte: null, label: 'recipes_page.filters.all_label' },
    { id: ECookingTime.TO_FIFTEEN_MINUTES, gte: null, lte: 15, label: 'recipes_page.filters.less_than_fifteen' },
    { id: ECookingTime.TO_THIRTY_MINUTES, gte: null, lte: 30, label: 'recipes_page.filters.less_than_thirty' },
    { id: ECookingTime.TO_SIXTY_MINUTES, gte: null, lte: 60, label: 'recipes_page.filters.less_than_sixty' },
    { id: ECookingTime.FROM_THIRTY_MINUTES, gte: 30, lte: null, label: 'recipes_page.filters.greater_than_thirty' }
]

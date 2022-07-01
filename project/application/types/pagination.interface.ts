export interface IPagination {
    totalItems: number;
    itemsPerPage?: number;
    page: number;
    pages?: number;
    limitPerPage?: number;
}
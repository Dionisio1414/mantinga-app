import { EStatus } from "~/constants/status";
import { IArticle } from "~/types/articles.interface";
import { IPagination } from "~/types/pagination.interface";

export interface IState {
    news: IArticle[];
    status: EStatus;
    error: Error | null;
    currentType: string | null;
    pagination: IPagination;
}

export default (): IState => {
    return {
        currentType: null,
        news: [],
        status: EStatus.INIT,
        error: null,
        pagination: {
            itemsPerPage: 30,
            page: 1,
            totalItems: 0
        }
    };
}

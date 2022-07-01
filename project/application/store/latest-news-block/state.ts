import { EStatus } from "~/constants/status";
import { IArticle } from "~/types/articles.interface";

export interface IState {
    data: IArticle[];
    status: EStatus;
    error: Error | null;
}

export default (): IState => {
    return {
        data: [],
        status: EStatus.INIT,
        error: null
    };
}

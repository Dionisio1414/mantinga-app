import { EStatus } from "~/constants/status";
import { ISearchResult } from "~/types/search.interface";

export interface IState {
    status: EStatus;
    error: Error | null;
    result: ISearchResult | null;
    searchStr: string;
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: null,
        result: null,
        searchStr: ''
    };
}

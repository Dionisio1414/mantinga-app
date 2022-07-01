import { EStatus } from "~/constants/status";
import { IPresentationBuilderCategory } from "~/types/presentation-builder.interface";

export interface IState {
    status: EStatus;
    error: Error | null;
    categories: IPresentationBuilderCategory[];
    generatingStatus: EStatus
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: null,
        categories: [],
        generatingStatus: EStatus.INIT
    };
}

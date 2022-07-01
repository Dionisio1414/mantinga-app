import { EStatus } from "~/constants/status";
import { ITaxon } from "~/types/taxons";

export interface IState {
    status: EStatus;
    error: Error | null;
    taxons: ITaxon[];
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: null,
        taxons: []
    };
}

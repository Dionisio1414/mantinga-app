import { EStatus } from "~/constants/status"
import { IRecipeTimes } from '~/types/recipes.interface'

export interface IState {
    recipeTimes: IRecipeTimes[] | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => {
    return {
        recipeTimes: null,
        status: EStatus.INIT,
        error: null
    };
}

import { EStatus } from "~/constants/status"
import { IRecipeInner } from '~/types/recipes.interface'

export interface IState {
    recipeData: IRecipeInner | null;
    status: EStatus;
    error: Error | null;
    generatingStatus: EStatus
}

export default (): IState => {
    return {
        recipeData: null,
        status: EStatus.INIT,
        error: null,
        generatingStatus: EStatus.INIT
    };
}

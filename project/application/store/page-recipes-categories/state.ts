import { EStatus } from "~/constants/status"
import { IRecipeCategories } from '~/types/recipes.interface'

export interface IState {
    recipeCategories: IRecipeCategories[] | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => {
    return {
        recipeCategories: null,
        status: EStatus.INIT,
        error: null
    };
}

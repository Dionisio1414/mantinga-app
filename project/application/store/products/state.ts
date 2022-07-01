import { EStatus } from "~/constants/status";
import { IRecipeInnerProduct } from "~/types/recipes.interface";

export interface IState {
    products: IRecipeInnerProduct[] | null;
    status: EStatus;
    error: Error | null;
}

export default (): IState => {
    return {
        products: null,
        status: EStatus.INIT,
        error: null
    };
}

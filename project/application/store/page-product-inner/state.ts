import { EStatus } from "~/constants/status";
import { IProduct, IProductCard } from "~/types/product.interface";
import { IRecipe } from "~/types/recipes.interface";

export interface IState {
    status: EStatus;
    error: Error | null;
    product: IProduct | null;
    productsList: IProduct[];
    similarProducts: IProductCard[];
    recipes: IRecipe[];
    generatingStatus: EStatus;
}

export default (): IState => {
    return {
        status: EStatus.INIT,
        error: null,
        product: null,
        productsList: [],
        similarProducts: [],
        recipes: [],
        generatingStatus: EStatus.INIT,
    };
}

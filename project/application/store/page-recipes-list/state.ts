import { EStatus } from "~/constants/status"
import { IPagination } from "~/types/pagination.interface";
import { IRecipe, IRecipeGetParams } from '~/types/recipes.interface'

export interface IState {
    recipes: IRecipe[] | null;
    recipesItems: number,
    status: EStatus;
    error: Error | null;
    pagination: IPagination;
    form: IRecipeGetParams
}

export default (): IState => {
    return {
        recipes: null,
        recipesItems: 0,
        status: EStatus.INIT,
        error: null,
        pagination: {
            itemsPerPage: 48,
            page: 1,
            totalItems: 0
        },
        form: {
            'cookingTime': null,
            'category.id': null,
            'products.id': null,
            'order[date]': 'desc',
            'cookingTimeMinutes[lt]': null,
            'cookingTimeMinutes[between]': null,
            'cookingTimeMinutes[gt]': null,
            'cookingTimeMinutes[gte]': null,
            'cookingTimeMinutes[lte]': null
        }
    };
}

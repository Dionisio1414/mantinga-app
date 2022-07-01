// import { ICookingFilterOptions } from "~/constants/cooking-filter-options";
import { ECookingTimesType } from "~/constants/cooking-filter-options";
import { IRecipeGetParams, IRecipeTimes } from "~/types/recipes.interface";

export default (id: string | number | null, params: IRecipeGetParams, options: IRecipeTimes[]) => {
    if(!id) {
        return params;
    }

    const result: IRecipeGetParams = {}
    const selectedOption = options.find(opt => opt.id === id)
    const { filterType, time }: any = selectedOption

    switch(filterType) {
        case ECookingTimesType.GTE:
            result['cookingTimeMinutes[gte]'] = time
            break;
        case ECookingTimesType.LTE:
            result['cookingTimeMinutes[lte]'] = time
            break;
        case ECookingTimesType.GT:
            result['cookingTimeMinutes[gt]'] = time
            break;
        case ECookingTimesType.LT:
            result['cookingTimeMinutes[lt]'] = time
            break;
    }
    
    // if(filterType === ECookingTimesType.GTE) {
    //     result['cookingTimeMinutes[gte]'] = time
    // } 
    
    // if(filterType === ECookingTimesType.LTE) {
    //     result['cookingTimeMinutes[lte]'] = time
    // }

    // if(filterType === ECookingTimesType.GT) {
    //     result['cookingTimeMinutes[gt]'] = time
    // } 
    
    // if(filterType === ECookingTimesType.LT) {
    //     result['cookingTimeMinutes[lt]'] = time
    // }

    delete params.cookingTime

    return { ...params, ...result };
}
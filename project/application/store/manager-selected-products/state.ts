import { ISelectedProduct } from "~/types/selected-product";

export interface IState {
    selectedProducts: ISelectedProduct[];
    selectedLocale: string;
}

export default (): IState => {
    return {
        selectedProducts: [],
        selectedLocale: ''
    };
}

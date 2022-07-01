export interface IState {
    isMinimized: boolean;
    isShowProductsCategories: boolean;
}

export default (): IState => {
    return {
        isMinimized: false,
        isShowProductsCategories: false
    };
}

export interface IState {
    favouriteProducts: number[]
}

export default (): IState => {
    return {
        favouriteProducts: []
    };
}

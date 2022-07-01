export interface IState {
    supported: boolean;
    error: any;
}

export default (): IState => {
    return {
        supported: true,
        error: null
    };
}

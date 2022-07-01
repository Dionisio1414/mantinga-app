export interface IState {
    currentLocale: string;
}

export default (): IState => {
    return {
        currentLocale: 'lt'
    };
}

import { IDictionary } from "./dictionary.interface";

// Articles results 
export interface IArticleSearchItemTranslations {
    name: string;
    shortDescription: string;
    slug: string;
}

export interface IArticleSearchItem {
    date: string;
    id: number;
    image: string;
    translations: IDictionary<IArticleSearchItemTranslations>;
    type: number;
}

export interface IArticlesSearchResult {
    articles: IArticleSearchItem[];
    limitPerPage: number;
    page: number;
    pages: number;
    totalItems: number;
}

// Products results
export interface IProductCategory {
    code: string;
    id: number;
    name: string;
    parentName: string;
    slug: string;
}

export interface IProductSearchItem {
    category: IProductCategory;
    description: string;
    id: number;
    image: string;
    name: string;
    personalities: [];
    presentation: string;
    price: null;
    productBadges: [];
    productCode: string;
    shortDescription: string;
    slug: string;
    status: number;
    translations: string[];
}

export interface IProductsSearchResult {
    products: IProductSearchItem[];
    limitPerPage: number;
    page: number;
    pages: number;
    totalItems: number;
}

// Recipes result
export interface IRecipeSearchItemTranslations {
    name: string;
    ingredients: string[];
    slug: string;
    steps: string[]
}

export interface IRecipeImage {
    url: string;
}

export interface IRecipeCategory {
    id: number;
    name: string;
    position: number;
    slug: string;
}

export interface IRecipeSearchItem {
    category: IRecipeCategory;
    cookingTimeMinutes: number;
    date: string;
    id: number;
    images: IRecipeImage[];
    maxServings: number;
    minServings: number;
    products: [];
    video: string;
    translations: IDictionary<IRecipeSearchItemTranslations>;
}

export interface IRecipesSearchResult {
    recipes: IRecipeSearchItem[];
    limitPerPage: number;
    page: number;
    pages: number;
    totalItems: number;
}

// Search results
export interface ISearchResult {
    articles: IArticlesSearchResult;
    products: IProductsSearchResult;
    recipes: IRecipesSearchResult;
}

export interface ISearchResultForLayout {
    name: string,
    image: string,
    id: number,
    slug: string,
}
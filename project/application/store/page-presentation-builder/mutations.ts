import { MutationTree } from 'vuex';
import { EStatus } from '~/constants/status';
import { IManagerProduct } from '~/types/manager-products.interface';
import { IChangeCategoryPositionPayload, IChangeProductPositionPayload, IDeleteProductPayload, IPresentationBuilderCategory, IPresentationBuilderSubcategory } from '~/types/presentation-builder.interface';
import { ISubTaxon, ITaxon } from '~/types/taxons';

import { IState } from './state';

export default {
    fetchProductsInit: (state) => {
        state.error = null;
        state.status = EStatus.PROCESSING;

        state.categories = [];
    },
    fetchProductsSuccess: (state, { data, allCategories }) => {
        const products: IManagerProduct[] = data?.products.products;
        let result: IPresentationBuilderCategory[] = [];

        allCategories.forEach((taxon: ITaxon) => {
            let taxonForPush: any = [];

            taxon.children.forEach((child: ISubTaxon, childIndex: number) => {
                const productsFromChild = products.filter((product: IManagerProduct) => product.category.id === child.id);
                if (productsFromChild && productsFromChild.length) {
                    taxonForPush = taxon;
                    taxonForPush.children[childIndex].products = productsFromChild;
                }
            });

            if (taxonForPush && taxonForPush.children && taxonForPush.children.length) {
                result.push(taxonForPush)
            }
        });


        result = result.map((r: IPresentationBuilderCategory) => {
            return {
                ...r,
                // @ts-ignore
                image: r.image?.[0]?.absolute_path || ''
            }
        })

        state.categories = result;
        state.status = EStatus.SUCCESS;
        state.error = null;
    },
    fetchProductsError: (state, payload: Error) => {
        state.status = EStatus.ERROR
        state.error = payload;
    },
    deleteCategory: (state, categoryId: number) => {
        state.categories = state.categories.filter((e: IPresentationBuilderCategory) => e.id !== categoryId);
    },
    deleteProduct: (state, { id, categoryId }: IDeleteProductPayload) => {
        let categories: IPresentationBuilderCategory[] = state.categories;

        categories = categories.map((category: IPresentationBuilderCategory) => {
            return {
                ...category,
                children: category.children.map((child: IPresentationBuilderSubcategory) => {
                    if (child?.products?.length) {
                        return {
                            ...child,
                            products: child.products?.filter((product: IManagerProduct) => product.id !== id) || []
                        }
                    } else {
                        return {
                            ...child
                        }
                    }

                })
            }
        })

        const category = categories.find((category: IPresentationBuilderCategory) => category.id === categoryId);

        const isCategoryHaveProducts = !!category?.children?.find((child: IPresentationBuilderSubcategory) => child.products && child.products.length)

        if (!isCategoryHaveProducts) {
            categories = categories.filter((category: IPresentationBuilderCategory) => category.id !== categoryId);
        }

        state.categories = categories;
    },
    changeProductPosition: (state, { direction, index, subcategoryIndex, categoryId }: IChangeProductPositionPayload) => {
        const category = state.categories.find((c: IPresentationBuilderCategory) => c.id === categoryId)
        const products: IManagerProduct[] | undefined = category?.children[subcategoryIndex].products

        let newIndex = direction === 'UP' ? index - 1 : index + 1

        if (newIndex === products?.length || newIndex === -1) return

        while (index < 0) {
            index += products?.length || 0
        }

        while (newIndex < 0) {
            newIndex += products?.length || 0
        }

        if (products?.length && newIndex >= products.length) {
            let k = newIndex - products?.length + 1
            while (k--) {
                // @ts-ignore
                products.push(undefined)
            }
        }

        products?.splice(newIndex, 0, products.splice(index, 1)[0]);

        state.categories = state.categories.map(category => {
            if (category.id === categoryId) {
                const newCategory = category;
                newCategory.children[subcategoryIndex].products = products || [];
                return {
                    ...newCategory
                }
            } else {
                return {
                    ...category
                }
            }
        })

        state.categories.forEach((category, index) => {
            if (category.id === categoryId) {
                const newCategory = category;
                newCategory.children[subcategoryIndex].products = products || [];

                state.categories[index].children[subcategoryIndex].products = products || [];
            }
        })
    },
    changeCategoryPosition: (state, { direction, oldIndex }: IChangeCategoryPositionPayload) => {
        let newIndex = direction === 'UP' ? oldIndex - 1 : oldIndex + 1

        const categories: IPresentationBuilderCategory[] = state.categories;

        if (newIndex === categories.length || newIndex === -1) return

        while (oldIndex < 0) {
            oldIndex += categories.length
        }

        while (newIndex < 0) {
            newIndex += categories.length
        }

        if (newIndex >= categories.length) {
            let k = newIndex - categories.length + 1
            while (k--) {
                // @ts-ignore
                categories.push(undefined)
            }
        }

        categories.splice(newIndex, 0, categories.splice(oldIndex, 1)[0])

        state.categories = categories;
    },
    clearCategories: (state) => {
        state.categories = []
    },
    generatePresentationInit: (state) => {
        state.generatingStatus = EStatus.PROCESSING
    },
    generatePresentationSuccess: (state) => {
        state.generatingStatus = EStatus.SUCCESS
    },
    generatePresentationError: (state) => {
        state.generatingStatus = EStatus.ERROR
    },
    updateCategories: (state, payload: IPresentationBuilderCategory[]) => {
        state.categories = payload
    }
} as MutationTree<IState>;

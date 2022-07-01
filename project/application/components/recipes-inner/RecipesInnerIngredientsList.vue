<template>
    <div class="recipes-inner-ingredients">
        <h2 class="recipes-inner-ingredients__caption h6" v-html="$sanitize(title)"></h2>
        <ul class="recipes-inner-ingredients__list">
            <li 
                v-for="(val, index) in transformIngredientList"
                :key="index"
                class="recipes-inner-ingredients__item"
            >   
                <NuxtLink 
                    v-if="val.slug || val.name"
                    class="links links--default" 
                    :to="localePath({name: 'p-slug', params: { slug: val.slug}})" 
                >
                    {{ val.name }}
                </NuxtLink>
                <div class="recipes-inner-ingredients__item-text" v-else>{{ val }}</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts"> 
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IRecipeInnerProduct } from '~/types/recipes.interface';
import { IVueI18n } from 'vue-i18n'

export interface ITransformIngredientsList {
    id: number;
    name: string;
    slug: string;
}

@Component({})
export default class ComponentRecipesInnerIngredientsList extends Vue {
    @Prop() public title!: string
    @Prop() public ingredientsList!: string[]
    @Prop() public productList!: IRecipeInnerProduct[]

    public get currentLocale(): string {
        return (this.$i18n as IVueI18n).locale
    }

    public get transformIngredientList(): any {
        const arr: Array<string | ITransformIngredientsList> = [ ...this.ingredientsList ]

        if(this.productList && this.productList.length) {
            this.productList.forEach(item => {
                arr.unshift({
                    id: item.id,
                    slug: item.translations[this.currentLocale]?.slug,
                    name: item.translations[this.currentLocale]?.name
                })
            })
        }

        return arr;
    }
}
</script>

<style lang="scss" scoped>
    .recipes-inner-ingredients {
        &__caption {
            margin-bottom: $space-24;
            color: $color-primary-dark;
        }
        &__list {
            padding: 0;
            margin: 0;
            @include media-lg {
                column-count: 2;
                column-width: 180px;
                column-gap: 0;
            }
        }
        &__item {
            position: relative;
            padding-left: 36px;
            margin-left: 10px;
            @include media-lg {
                margin-left: 20px;
            }
            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                background-image: url('~assets/images/svg/leaf-gold.svg');
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;
                width: 22px;
                height: 22px;
            }
            &:not(:last-child) {
                margin-bottom: $space-16;
            }
            &-text {
                font-size: 16px;
                font-weight: 400;
                line-height: 24px;
                letter-spacing: .5px;
            }
        }
    }
</style>
<template>
    <div class="recipes-inner-manufacturer">
        <h2 class="recipes-inner-manufacturer__caption h6" v-html="$sanitize(title)"></h2>
        <ol class="recipes-inner-manufacturer__list">
            <li 
                v-for="(val, index) in manufacturerList"
                :key="index"
                class="recipes-inner-manufacturer__item subtitle"
            >
                {{ val }}
            </li>
        </ol>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentRecipesInnerManufacturerList extends Vue {
    @Prop() public title!: string;
    @Prop() public manufacturerList!: string[];
}
</script>

<style lang="scss" scoped>
    .recipes-inner-manufacturer {
        &__caption {
            margin-bottom: $space-16;
            color: $color-primary-dark;
        }
        &__list {
            counter-reset: list-counter;
        }
        &__item {
            display: flex;
            align-items: center;
            counter-increment: list-counter;
            &::before {
                content: counter(list-counter); 
                background: $color-golden;
                border-radius: 8px;
                padding: 8px 18px;
                font-size: 18px;
                line-height: 32px;
                font-weight: bold;
                letter-spacing: .5px;
                margin-right: $space-16;
                color: $color-white;
            }
            &:not(:last-child) {
                margin-bottom: $space-16;
                @include media-lg {
                    margin-bottom: $space-24;
                }
            }
        }
    }
</style>
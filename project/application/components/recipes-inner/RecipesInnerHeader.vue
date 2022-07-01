<template>
    <div class="recipes-inner-header">
        <h1 class="recipes-inner-header__title h5" v-html="$sanitize(title)"></h1>
        <!-- <div class="recipes-inner-header__description body-text1" v-html="$sanitize(description)"></div> -->
        <div class="recipes-inner-header__labels">
            <div v-if="showCookingTimeMinutes" class="recipes-inner-header__labels-item label label--grey">
                {{ cookingTimeMinutes }} {{ $sanitize($t('recipes_inner_page.cookingTimeMinutesLabel')) }}.
            </div>
            <div v-if="showServings" class="label label--grey">
                <svg-icon class="label-icon" name="account-outline" width="24" height="24" />
                {{ minServings }} - {{ maxServings }}
            </div>
        </div>
    </div>
</template>

<script lang="ts"> 
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentRecipesInnerHeader extends Vue {
    @Prop() public title!: string;
    @Prop() public minServings!: number;
    @Prop() public maxServings!: number;
    @Prop() public cookingTimeMinutes!: number;

    public get showServings(): boolean {
        return !!(this.maxServings && this.minServings)
    }

    public get showCookingTimeMinutes(): boolean {
        return !!(this.cookingTimeMinutes)
    }
}
</script>

<style lang="scss" scoped>
    .recipes-inner-header {
        @include media-lg {
            padding-right: $space-32;
        }
        &__title {
            margin-bottom: $space-16;
            color: $color-primary-dark;
        }
        &__description {
            margin-bottom: $space-16;
            @include media-lg {
                margin-bottom: $space-24;
            }
        }
        &__labels {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            &-item:not(:last-child) {
                margin-right: $space-16;
            }
        }
    }
</style>
<template>
    <div class="fact-card">
        <div class="fact-card__title fact-card__title--desktop h4">{{ cardDataTitle }}</div>
        <div class="fact-card__title fact-card__title--mobile h6">{{ cardDataTitle }}</div>
        <div class="fact-card__subtitle fact-card__subtitle--desktop h6">{{ cardDataSubtitle }}</div>
        <div class="fact-card__subtitle fact-card__subtitle--mobile subtitle">{{ cardDataSubtitle }}</div>
        <div class="fact-card__picture">
            <img class="fact-card__picture--picture" :src="cardDataImage" :alt="cardDataSubtitle">
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeFactsBlocks } from '~/types/content-type-facts.interface'

@Component({})
export default class ContentTypeFeaturesList extends Vue {
    @Prop() public cardData!: IContentTypeFactsBlocks

    public get cardDataTitle(): string {
        return this.cardData.title.value ?? ''
    }

    public get cardDataSubtitle(): string {
        return this.cardData.subtitle.value ?? ''
    }

    public get cardDataImage(): string {
        return this.cardData.image.url ?? ''
    }
}
</script>

<style lang="scss" scoped>
    .fact-card {
        background: $color-golden-light;
        border-radius: 8px;
        padding: $space-32 $space-24;

        &__picture {
            margin: auto;
            max-width: 72px;
            max-height: 72px;
            &--picture {
                display: block;
                max-width: 100%;
                height: auto;
                object-fit: cover;
            }
        }

        &__title {
            text-align: center;
            margin-bottom: $space-16;
            &--desktop {
                display: none;
                @include media-md {
                    display: block;
                }

            }

            &--mobile {
                display: block;
                @include media-md {
                    display: none;
                }
            }
        }

        &__subtitle {
            text-align: center;
            margin-bottom: $space-24;
            &--desktop {
                display: none;
                @include media-md {
                    display: block;
                }

            }

            &--mobile {
                display: block;
                @include media-md {
                    display: none;
                }
            }
        } 
    }
</style>
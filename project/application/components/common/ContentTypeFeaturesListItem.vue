<template>
    <div class="feature-card">
        <div class="feature-card__icon">
            <svg-icon name="leaf-gold" width="24" height="24" />
        </div>
        <div class="feature-card__title h5">{{ cardDataTitle }}</div>
        <div class="feature-card__subtitle body-text1">{{ cardDataSubtitle }}</div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeFeaturesBlocks } from '~/types/content-type-features.interface'

@Component({})
export default class ContentTypeFeaturesList extends Vue {
    @Prop() public cardData!: IContentTypeFeaturesBlocks

    public get cardDataTitle(): string {
        return this.cardData.title.value ?? ''
    }

    public get cardDataSubtitle(): string {
        return this.cardData.subtitle.value ?? ''
    }

}
</script>

<style lang="scss" scoped>
    .feature-card {
        background: $color-golden-light;
        border-radius: 8px;
        padding: $space-32 $space-24;
        
        &__icon {
            line-height: 0;
            text-align: center;
            margin-bottom: $space-16;
        }

        &__title {
            text-align: center;
            margin-bottom: $space-16;
        }

        &__subtitle {
            text-align: center;
        } 

    }
</style>
<template>
    <div class="features-list">
        <div class="features-list__headline h4">{{ titleValue }}</div>
        <div class="features-list__container">
            <ContentTypeFeaturesListItem
                v-for="(val, index) in blockValues"
                :key="index"
                :cardData="val"
                class="features-list__card"
            >
            </ContentTypeFeaturesListItem>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeFeaturesBlocks, IContentTypeFeaturesProperties } from '~/types/content-type-features.interface'
import ContentTypeFeaturesListItem from '~/components/common/ContentTypeFeaturesListItem.vue'

@Component({
    components: { ContentTypeFeaturesListItem }
})
export default class ContentTypeFeaturesList extends Vue {
    @Prop() public properties!: IContentTypeFeaturesProperties

    public get titleValue(): string {
        return this.properties.headline.value ?? '';
    }

    public get blockValues(): IContentTypeFeaturesBlocks[] {
        return this.properties.blocks.value ?? []
    }
}
</script>

<style lang="scss" scoped>
    .features-list {

        &__headline {
            text-align: center;
            margin-bottom: $space-24;
        }

        &__container {
            display: flex;
            flex-wrap: wrap;
            gap: $space-16;
            max-width: 1200px;
            padding: 0 $space-16;
            margin: 0 auto;
            @include media-lg {
                gap: $space-24;
                padding: 0;
            }
        }

        &__card {
            flex: 1 1 100%;
            @include media-sm {
                flex: 0 1 calc(1/2 * 100% - $space-24);
            }
            @include media-lg {
                flex: 0 1 calc(1/3 * 100% - $space-24);
            }
        }
        
    }
</style>
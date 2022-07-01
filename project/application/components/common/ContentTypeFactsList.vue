<template>
    <div class="facts-list">
        <div class="facts-list__headline facts-list__headline--desktop h4">{{ titleValue }}</div>
        <div class="facts-list__headline facts-list__headline--mobile h5">{{ titleValue }}</div>
        <div class="facts-list__container">
            <ContentTypeFactsListItem
                v-for="(val, index) in blockValues"
                :key="index"
                :cardData="val"
                class="facts-list__card"
            >
            </ContentTypeFactsListItem>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeFactsBlocks, IContentTypeFactsProperties } from '~/types/content-type-facts.interface'
import ContentTypeFactsListItem from '~/components/common/ContentTypeFactsListItem.vue'

@Component({
    components: { ContentTypeFactsListItem }
})
export default class ContentTypeFeaturesList extends Vue {
    @Prop() public properties!: IContentTypeFactsProperties

    public get titleValue(): string {
        return this.properties.headline.value ?? '';
    }

    public get blockValues(): IContentTypeFactsBlocks[] {
        return this.properties.blocks.value ?? []
    }
}
</script>

<style lang="scss" scoped>
    .facts-list {

        &__headline {
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

        &__container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: $space-16;
            max-width: 1200px;
            padding: 0 $space-16;
            margin: 0 -$space-16;
            @include media-lg {
                justify-content: flex-start;
                gap: $space-24;
                padding: 0;
                margin: 0 auto;
            }
        }

        &__card {
            flex: 0 1 calc(1/2 * 100% - $space-24);
            @include media-md {
                flex: 0 1 calc(1/3 * 100% - $space-16);
            }
            @include media-lg {
                flex: 0 1 calc(1/4 * 100% - $space-24);
            }
        }
        
    }
</style>
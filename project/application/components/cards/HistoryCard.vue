<template>
    <div class="history-card">
        <div class="history-card__picture">
            <img class="history-card__image" :src="imageUrl">
        </div>
        <div class="history-card__content">
            <div
                v-if="titleValue"
                :title="titleValue"
                class="history-card__title h6"
                v-html="$sanitize(titleValue)"
            >
            </div>
            <div
                v-if="subtitleValue"
                :title="subtitleValue"
                class="history-card__subtitle body-text1 truncate truncate--2-lines"
                v-html="$sanitize(subtitleValue)"
            >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeHistoryBlocks } from '~/types/content-type-history.interface'

@Component({})
export default class ComponentHistoryCard extends Vue {
    @Prop() public cardData!: IContentTypeHistoryBlocks

    public get titleValue(): string {
        return this.cardData.title.value ?? null
    }

    public get subtitleValue(): string {
        return this.cardData.subtitle.value ?? null
    }

    public get imageUrl(): string {
        return this.cardData.image.url ?? ''
    }
}
</script>

<style lang="scss" scoped>
    .history-card {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: $shadow-100;
        min-height: 313px;
        transition: box-shadow .25s ease-in-out;
        @include media-lg {
            box-shadow: none;
        }

        &__title {
            margin-bottom: $space-8;
        }

        &__picture {
            position: relative;
            height: 185px;
            max-height: 185px;
            overflow: hidden;
        }

        &__image {
            display: block;
            width: 100%;
            max-width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }

        &__content {
            background-color: $color-white;
            padding: $space-16 $space-24 $space-24 $space-24;
            transition: background-color .25s ease-in-out;
            @include media-lg {
                background-color: transparent;
            }
        }
    }
</style>
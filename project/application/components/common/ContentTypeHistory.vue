<template>
    <div class="history">
        <div class="history__container">
            <h2 
                v-if="titleValue"
                class="history__headline history__headline--desktop h4"
                v-html="$sanitize(titleValue)"
            >
            </h2>
            <h2 
                v-if="titleValue"
                class="history__headline history__headline--mobile h5"
                v-html="$sanitize(titleValue)"
            >
            </h2>
            <HistorySlider 
                ref="historySlider"
                :historyList="blockValues"
            >
            </HistorySlider>
            <div class="history__line" :style="{ left: lineLeftPosition }"></div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeHistoryProperties, IContentTypeHistoryBlocks } from '~/types/content-type-history.interface'
import HistorySlider from '~/components/common/HistorySlider.vue'

@Component({
  components: { HistorySlider }
})
export default class ComponentContentTypeHistory extends Vue {
    @Prop() public properties!: IContentTypeHistoryProperties

    public lineLeftPosition: string = '0'

    public get titleValue(): string {
        return this.properties.headline.value ?? null;
    }

    public get blockValues(): IContentTypeHistoryBlocks[] {
        return this.properties.blocks.value ?? []
    }

    public calculateLinePosition(): void {
        // @ts-ignore
        const rect = this.$refs?.historySlider?.$el.getBoundingClientRect()
        this.lineLeftPosition = `-${rect.left}px`
    }

    public mounted(): void {
        if (process.client) {
            this.calculateLinePosition()

            window.addEventListener('resize', this.calculateLinePosition)
        }

    }

    public destroyed(): void {
        window.removeEventListener('resize', this.calculateLinePosition)
    }
}
</script>

<style lang="scss" scoped>
.history {
    background: $color-golden-light;
    padding: $space-24 0 $space-56 $space-32;
    @include media-lg {
        padding: $space-56 $space-24;
    }

    &__container {
        position: relative;
        max-width: 1200px;
        margin: auto;
    }

    &__headline {
        text-align: center;
        margin-bottom: $space-32;
        @include media-lg {
            margin-bottom: $space-56;
        }

        &--desktop {
            display: none;
            @include media-lg {
                display: block;
            }

        }

        &--mobile {
            display: block;
            @include media-lg {
                display: none;
            }
        }
    }

    &__line {
      display: block;
      width: 100vw;
      position: absolute;
      top: 254px;
      z-index: 10;
      height: 4px;
      background-color: $color-golden;
      @include media-lg {
        top: 294px;
      }
    }
}

</style>

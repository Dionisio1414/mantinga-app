<template>
    <div class="history-slider">
        <client-only>
            <swiper
                class="history-slider__swiper"
                :options="sliderOptions"
            >
                <swiper-slide 
                    v-for="(history, index) in historyList" 
                    :key="index"
                >
                    <HistoryCard 
                        :cardData="history"
                    >
                    </HistoryCard>
                </swiper-slide>
            </swiper>
        </client-only>
        <div v-if="historyList.length > slidesPerViewDesktop" class="history-slider__controls">
            <div class="history-swiper-button-prev">
                <svg-icon
                    class="swiper__icon"
                    name="chevron-left"
                    width="24"
                    height="24"
                />
            </div>
            <div class="history-swiper-button-next">
                <svg-icon
                    class="swiper__icon"
                    name="chevron-right"
                    width="24"
                    height="24"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeHistoryBlocks } from '~/types/content-type-history.interface'
import HistoryCard from '~/components/cards/HistoryCard.vue'

@Component({
    components: { HistoryCard }
})
export default class ComponentHistorySlider extends Vue {
    @Prop() public historyList!: IContentTypeHistoryBlocks[]
   
    public slidesPerViewDesktop: number = 4

    public sliderOptions = {
        slidesPerView: 'auto',
        spaceBetween: 24,
        slideToClickedSlide: false,
        breakpoints: {
            992: {
                allowTouchMove: true,
                slidesPerView: this.slidesPerViewDesktop,
            },
        },
        navigation: {
            nextEl: '.history-swiper-button-next',
            prevEl: '.history-swiper-button-prev',
            disabledClass: 'history-swiper-button-disabled'
        }
    }

}
</script>

<style lang="scss" scoped>
.history-slider {
    position: relative;
    width: 100%;
    height: auto;
    &__controls {
        display: none;
        justify-content: space-between;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + 80px);
        height: 25px;
        @include media-lg {
            display: flex;
        }

    }

    &__swiper {
        padding: 5px 5px 5px 32px;
        @include media-lg {
            padding: 5px;
        }
        .swiper-slide {
            width: 246px;
            height: auto;
            @include media-lg {
                width: auto;
            }
        }
    }

    .history-swiper-button-next,
    .history-swiper-button-prev {
        position: static;
        display: block;
        z-index: 100;
        width: 24px;
        height: 24px;
        color: black;
        margin: 0;
        cursor: pointer;

        &:after {
            display: none;
        }
    }

    .history-swiper-button-disabled {
        opacity: 0.5;
    }
}

</style>
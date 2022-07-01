<template>
    <div class="recipes-inner-gallery">
        <div class="recipes-inner-gallery__wrapper">
            <CommonGallery
              :images="images"
              :video="video"
              :slider-options="sliderOptions"
              :thumbs-options="thumbsOptions"
            >
            </CommonGallery>
        </div>
        <div class="recipes-inner-gallery__actions">
            <button 
                type="button"
                class="links links--default-hover"
                @click="downloadRecipeHandler"
            >
                <svg-icon class="icon-default" name="cloud-download" width="24" height="24" />
                {{ $sanitize($t('recipes_inner_page.button_print_out_recipe')) }}
            </button>
        </div>
    </div>
</template>

<script lang="ts"> 
import { Vue, Component, Prop, Emit } from 'nuxt-property-decorator'
import { SwiperOptions } from 'swiper'
import CommonGallery from '~/components/gallery/CommonGallery.vue'

@Component({
    components: { CommonGallery }
})
export default class ComponentRecipesInnerGallery extends Vue {
    @Prop({ default: () => [] }) public images!: string[]
    @Prop({ default: '' }) public video!: string

    public sliderOptions: SwiperOptions = {
        loop: true,
        loopedSlides: 4
    }

    public thumbsOptions: SwiperOptions = {
        loop: true,
        loopedSlides: 4
    }

    @Emit('downloadRecipe')
    public downloadRecipeHandler(): void {}
}
</script>

<style lang="scss" scoped>
    .recipes-inner-gallery {
        &__wrapper {
            margin: 0 -16px 24px -16px;
            @include media-md {
                margin: 0 0 24px 0;
            }
        }
        &__actions {
            text-align: center;
        }
    }

</style>
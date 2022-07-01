<template>
    <BannerSlider
        :properties="properties"
        :watchHeaderMinimize="watchHeaderMinimize"
        :is-min="true"
    >
    </BannerSlider>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import BannerSlider from '~/components/common/BannerSlider.vue'
import { IContentTypeSliderProperties } from '~/types/content-type-slider.interface'

@Component({
    components: { BannerSlider }
})
export default class ComponentContentTypeSliderMin extends Vue {
    @Prop() public readonly properties!: IContentTypeSliderProperties

    public watchHeaderMinimize: boolean = true
}
</script>

<template>
    <div class="sales-contacts">
        <div class="sales-contacts__container">
            <div class="sales-contacts__list">
                <SalesContactBlock
                    v-for="(val, index) in salesContactsValues"
                    :key="index"
                    :cardData="val"
                    class="sales-contacts__item"
                >
                </SalesContactBlock>
            </div>
        </div>
        <Map
            class="sales-contacts__map"
            :zoom="9"
            :coordinates="salesContactsCoordinates"
            :infoWindowData="salesContactsValues"
            :isPopup="true"
            
        >
            <template v-slot:content="slotProps">
                <MapInfoContent :properties="slotProps"></MapInfoContent>
            </template>
        </Map>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import SalesContactBlock from '~/components/contacts/SalesContactBlock.vue'
import { IContentTypeSalesContactsProperties, IContentTypeSalesContactsPropertiesValues } from '~/types/content-type-sales-contacts.interface';
import Map from '~/components/common/Map.vue'
import { EMarkerTypes } from '~/constants/marker-types'
import { IContentLocationsCoordinates } from '~/types/map-options.interface'
import MapInfoContent from '~/components/common/MapInfoContent.vue'

@Component({
    components: {
        SalesContactBlock,
        Map,
        MapInfoContent
    }
})

export default class ComponentContentTypeSaleContacts extends Vue {
    @Prop() public properties!: IContentTypeSalesContactsProperties

    public get salesContactsValues(): IContentTypeSalesContactsPropertiesValues[] {
        return this.properties?.entries?.value ?? []
    }

    public get salesContactsCoordinates(): IContentLocationsCoordinates[] {
        return (this.salesContactsValues || []).map((item: any) => {
            return {
                location: item.coordinates.value,
                type: EMarkerTypes.SALES
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .sales-contacts {

        &__container {
            max-width: 1200px;
            padding: 0 $space-16;
            margin: 0 auto $space-56 auto;
        }

        &__list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: $space-24;
            @include media-lg {
                justify-content: flex-start;
            }
        }

        &__item {
            flex: 1 1 100%;
            @include media-lg {
                flex: 0 1 calc(1/4 * 100% - $space-24);
            }
        }

        &__map {
            height: 400px;
            @include media-lg {
                height: 677px;
            }
        }

    }
</style>
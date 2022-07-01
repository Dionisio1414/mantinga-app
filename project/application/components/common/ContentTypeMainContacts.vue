<template>
    <div class="main-contacts">
        <div class="main-contacts__container">
            <div class="main-contacts__header">
                <div class="main-contacts__header-column">
                    <MainContactBlock
                        :companyNameValue="companyNameValue"
                        :phonesValues="phonesValues"
                        :addressValue="addressValue"
                        :emailValue="emailValue"
                        :companyCodesValues="companyCodesValues"
                    >
                    </MainContactBlock>
                </div>
                <div class="main-contacts__header-column">
                    <Map
                        class="main-contacts__map"
                        :zoom="9"
                        :coordinates="coordinatesValue"
                        :infoWindowData="properties"
                        :isPopup="false"
                    >
                        <!-- <template v-slot:content="slotProps">
                            <MapInfoContent :properties="slotProps"></MapInfoContent>
                        </template> -->
                    </Map>
                </div>
            </div>
            <div class="main-contacts__footer">
                <ContactBlock
                    v-for="(val, index) in blocksValues"
                    :key="index"
                    :blocksValues="val"
                    class="main-contacts__footer-item"
                >
                </ContactBlock>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeMainContactsBlocks, IContentTypeMainContactsPhones, IContentTypeMainContactsProperties } from '~/types/content-type-main-contacts.interface'
import MainContactBlock from '~/components/contacts/MainContactBlock.vue'
import ContactBlock from '~/components/contacts/ContactBlock.vue'
import Map from '~/components/common/Map.vue'
import { EMarkerTypes } from '~/constants/marker-types';
import { IContentLocationsCoordinates } from '~/types/map-options.interface';
import MapInfoContent from '~/components/common/MapInfoContent.vue'

@Component({
    components: {
        MainContactBlock,
        ContactBlock,
        Map,
        MapInfoContent
    }
})
export default class ComponentContentTypeMainContacts extends Vue {
    @Prop() public properties!: IContentTypeMainContactsProperties

    public get coordinatesValue(): IContentLocationsCoordinates[] {
        return [
            {
                location: this.properties.coordinates.value ?? null,
                type: EMarkerTypes.MAIN
            }
        ]
    }

    public get addressValue(): string {
        return this.properties.address.value ?? null
    }

    public get phonesValues(): IContentTypeMainContactsPhones[] {
        return this.properties.phones.value ?? []
    }

    public get emailValue(): string {
        return this.properties.email.value ?? null
    }

    public get companyCodesValues(): string {
        return this.properties.company_codes.value ?? null
    }

    public get blocksValues(): IContentTypeMainContactsBlocks[] {
        return this.properties.blocks.value ?? []
    }

    public get companyNameValue(): string {
        return this.properties.company_name.value ?? null
    }
}
</script>

<style lang="scss" scoped>
    .main-contacts {

        &__container {
            max-width: 1200px;
            padding: 0 $space-16;
            margin: auto;
            @include media-lg {
                padding: 0;
            }
        }

        &__header {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: $space-32;
            margin-bottom: $space-48;
            @include media-lg {
                gap: $space-24;
                margin-bottom: $space-24;
            }
            &-column:first-child {
                flex: 1 1 100%;
                @include media-lg {
                    flex: 0 1 calc(33.3333% - $space-24);
                }
            }

            &-column:last-child {
                flex: 1 1 100%;
                margin: 0 -16px;
                @include media-lg {
                    flex: 0 1 calc(66.6667% - $space-24);
                    margin: 0;
                }
            }
        }

        &__footer {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: $space-16;
            @include media-lg {
                gap: $space-24;
            }
            &-item {
                flex: 1 1 100%;
                @include media-lg {
                    flex: 0 1 calc(1/3 * 100% - $space-24);
                }
            }
        }

        &__map {
            height: 456px;
            @include media-lg {
                height: 100%;
                border-radius: 8px;
                overflow: hidden;
            }
        }
    }
</style>
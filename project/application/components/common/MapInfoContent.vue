<template>
    <div class="gmap-popup-content">
        <div 
            v-if="titleValue"
            class="gmap-popup-content__title body-text1"
            v-html="$sanitize(titleValue)"
        >
        </div>
        <div class="gmap-popup-content__list">
            <div v-if="addressValue" class="gmap-popup-content__list-item gmap-popup-content__list-item--address">
                <div 
                    class="content-area"
                    v-html="$sanitize(addressValue)"
                >
                </div>
            </div>
            <div
                v-if="phoneValues && phoneValues.length" 
                class="gmap-popup-content__list-item gmap-popup-content__list-item--phone"
            >
                <div class="content-area">
                    <div 
                        class="phone-item" 
                        v-for="(val, index) in phoneValues"
                        :key="index"
                        v-html="$sanitize(val.phone.value)"
                    >
                    </div>
                </div>
            </div>  
            <div 
                v-if="scheduleValue"
                class="gmap-popup-content__list-item gmap-popup-content__list-item--schedule"
            >
                <div 
                    class="content-area"
                    v-html="$sanitize(scheduleValue)"
                >
                </div>
            </div>
            <a 
                v-if="emailValue"
                :href="emailHref" 
                class="gmap-popup-content__list-item gmap-popup-content__list-item--email"
            >
                <div 
                    class="content-area"
                    v-html="$sanitize(emailValue)"
                >
                </div>
            </a>
            <a 
                v-if="siteUrlValue"
                :href="siteUrlHref" 
                class="gmap-popup-content__list-item gmap-popup-content__list-item--site"
            >
                <div 
                    class="content-area"
                    v-html="$sanitize(siteUrlValue)"
                >
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeMainContactsProperties } from '~/types/content-type-main-contacts.interface'
import { IContentTypeSalesContactsPhones, IContentTypeSalesContactsPropertiesValues } from '~/types/content-type-sales-contacts.interface'
import { IDictionary } from '~/types/dictionary.interface'

@Component
export default class ComponentMapInfoContent extends Vue {
    @Prop() public properties!: IDictionary<any>

    public $sanitize!: (value: string, options?: any) => string

    public get titleValue(): string | null {
        if(this.properties?.infoContent?.subtitle) {
            return this.properties.infoContent.subtitle.value
        } 

        if(this.properties?.infoContent?.company_name) {
            return this.properties.infoContent.company_name.value
        }

        return null
    }

    public get addressValue(): string | null {
        if(this.properties?.infoContent?.address?.value) {
            return this.properties.infoContent.address.value
        } 

        if(!this.properties?.infoContent?.address?.value && this.properties.infoContent?.coordinates?.value) {
            return this.properties.infoContent.coordinates.value
        }

        return null
    }

    public get phoneValues(): IContentTypeSalesContactsPhones[] {
        return this.properties?.infoContent?.phones?.value ?? []
    }

    public get scheduleValue(): string {
        return this.properties?.infoContent?.schedule?.value ?? null
    }

    public get emailHref(): string {
        return this.$sanitize(
            `mailto:${this.properties?.infoContent?.email?.value}`,
            {
                allowedTags: [],
                allowedAttributes: {},
                allowedStyles: {}
            }
        ).trim();
    }

    public get emailValue(): string | null {
        return this.properties?.infoContent?.email?.value ? this.$sanitize(
            this.properties?.infoContent?.email?.value,
            {
                allowedTags: [],
                allowedAttributes: {},
                allowedStyles: {}
            }
        ).trim() : null;
    }

    public get siteUrlValue(): string | null {
        return this.properties?.infoContent?.site_url?.value ? this.$sanitize(
            this.properties?.infoContent?.site_url?.value,
            {
                allowedTags: [],
                allowedAttributes: {},
                allowedStyles: {}
            }
        ).trim() : null;
    }

    public get siteUrlHref(): string {
        return this.$sanitize(
            this.properties?.infoContent?.site_url?.value,
            {
                allowedTags: [],
                allowedAttributes: {},
                allowedStyles: {}
            }
        ).trim();
    }
}
</script>

<style lang="scss" scoped>
.gmap-popup-content {
    padding: 22px 32px;
    &__title {
        margin-bottom: $space-16;
    }

    &__list-item {
        display: flex;
        justify-content: flex-start;
        text-decoration: none;

        &::before {
            content: "";
            background-position: center;
            background-size: contain;
            background-repeat: no-repeat;
            width: 20px;
            height: 20px;
            max-width: 20px;
            max-height: 20px;
            flex: 0 1 calc(20% - 18px);
        }

        .content-area {
            flex: 0 1 calc(80% - 18px);
            margin-left: 18px;
        }

        &:not(:last-child) {
            margin-bottom: $space-16;
        }

        &--address {
            &::before {
                background-image: url('~assets/images/svg/map-marker-outline.svg');
            }
        }

        &--schedule {
            &::before {
                background-image: url('~assets/images/svg/clock.svg');
            }
        }

        &--phone {
            &::before {
                background-image: url('~assets/images/svg/phone-in-talk-outline.svg');
            }
        }

        &--email {
            &::before {
                background-image: url('~assets/images/svg/email-outline.svg');
            }
        }

        &--site {
            &::before {
                background-image: url('~assets/images/svg/language.svg');
            }
        }
    }
}
</style>
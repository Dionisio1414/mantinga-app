<template>
    <div class="sales-contact-block">
        <div 
            v-if="titleValue || flagUrl"
            class="sales-contact-block__title sales-contact-block__title--desktop h5"
        >
            <span 
                v-show="flagUrl"
                class="flag"
                :style="{'background-image': `url(${flagUrl})`}"
            >
            </span>
            <span 
                v-show="titleValue"
                class="text"
                v-html="$sanitize(titleValue)"
            >
            </span>
        </div>
        <div 
            v-if="titleValue"
            class="sales-contact-block__title sales-contact-block__title--mobile h6"
        >
            <span 
                v-show="flagUrl"
                class="flag"
                :style="{'background-image': `url(${flagUrl})`}"
            >
            </span>
            <span 
                v-show="titleValue"
                class="text"
                v-html="$sanitize(titleValue)"
            >
            </span>
        </div>

        <div 
            v-if="subtitleValue"
            class="sales-contact-block__subtitle body-text1"
            v-html="$sanitize(subtitleValue)"
        >
        </div>
        
        <div class="sales-contact-block__address body-text1">
            <div 
                v-if="coordinatesValue"
                class="sales-contact-block__address-item sales-contact-block__address-item--address"
            >
                <div class="content-area">{{ $sanitize(coordinatesValue) }}</div>
            </div>
            <div 
                v-if="phoneValues && phoneValues.length"
                class="sales-contact-block__address-item sales-contact-block__address-item--phone"
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
                class="sales-contact-block__address-item sales-contact-block__address-item--schedule"
            >
                <div class="content-area">
                    {{ $sanitize(scheduleValue) }}
                </div>
            </div>
            <a :href="emailHref" 
                v-if="emailValue"
                class="sales-contact-block__address-item sales-contact-block__address-item--email"
            >
                <div class="content-area">
                    {{ emailValue }}
                </div>
            </a>
            <a 
                :href="siteUrlHref"
                v-if="siteUrlValue"
                target="_blank"
                class="sales-contact-block__address-item sales-contact-block__address-item--site"
            >
                <div class="content-area">
                    {{ siteUrlValue }}
                </div>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeSalesContactsPhones, IContentTypeSalesContactsPropertiesValues } from '~/types/content-type-sales-contacts.interface'

@Component({})
export default class ComponentSalesContactBlock extends Vue {
    @Prop() public cardData!: IContentTypeSalesContactsPropertiesValues

    public $sanitize!: (value: string, options?: any) => string

    public get titleValue(): string {
        return this.cardData.title.value ?? null
    }

    public get subtitleValue(): string {
        return this.cardData.subtitle.value ?? null
    }

    public get flagUrl(): string {
        return this.cardData.flag.url ?? null
    }

    public get coordinatesValue(): string {
        return this.cardData.coordinates.value ?? null
    }

    public get phoneValues(): IContentTypeSalesContactsPhones[] {
        return this.cardData.phones.value ?? []
    }

    public get scheduleValue(): string {
        return this.cardData.schedule.value ?? null
    }

    public get emailHref(): string {
        return this.$sanitize(
            `mailto:${this.cardData.email.value}`,
            {
                allowedTags: [],
                allowedAttributes: {},
                allowedStyles: {}
            }
        ).trim();
    }

    public get emailValue(): string | null {
        return this.cardData.email.value ? this.$sanitize(
            this.cardData.email.value,
            {
                allowedTags: [],
                allowedAttributes: {},
                allowedStyles: {}
            }
        ).trim() : null;
    }

    public get siteUrlValue(): string | null {
        return this.cardData.site_url.value ? this.$sanitize(
            this.cardData.site_url.value,
            {
                allowedTags: [],
                allowedAttributes: {},
                allowedStyles: {}
            }
        ).trim() : null;
    }

    public get siteUrlHref(): string {
        let link = this.cardData?.site_url?.value || ""

        if(link.length && link.indexOf("http://") !== 0 || link.indexOf("https://") !== 0) {
            link = `http://${link}`;
        }

        return this.$sanitize(
            link,
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
.sales-contact-block {

    &__title {
        align-items: center;
        margin-bottom: $space-16;
        .flag {
            display: block;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            width: 24px;
            height: 16px;
            margin-right: $space-16;
        }

        &--desktop {
            display: none;
            @include media-md {
                display: flex;
            }

        }

        &--mobile {
            display: flex;
            @include media-md {
                display: none;
            }
        }
    }

    &__subtitle {
        margin-bottom: $space-16;
    }

    &__address {
        &-item {
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

}
</style>
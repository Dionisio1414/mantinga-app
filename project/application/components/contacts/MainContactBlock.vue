<template>
    <div class="main-contact-block">
        <div 
            v-if="companyNameValue"
            class="main-contact-block__title main-contact-block__title--desktop h5"
            v-html="$sanitize(companyNameValue)"
        >
        </div>
        <div 
            v-if="companyNameValue"
            class="main-contact-block__title main-contact-block__title--mobile h6"
            v-html="$sanitize(companyNameValue)"
        >
        </div>

        <div v-if="addressValue" class="main-contact-block__address body-text1">
            <div 
                v-if="addressValue"
                class="main-contact-block__address-item main-contact-block__address-item--address"
                v-html="$sanitize(addressValue)"
            >
            </div>
            <div 
                v-if="phonesValues && phonesValues.length"
                class="main-contact-block__address-item main-contact-block__address-item--phone"
            >
                <div 
                    class="phone-item" 
                    v-for="(val, index) in phonesValues"
                    :key="index"
                    v-html="$sanitize(val.phone.value)"
                >
                </div>
            </div>
            <a :href="emailHref" 
                v-if="emailValueSanitize"
                class="main-contact-block__address-item main-contact-block__address-item--email"
                v-html="emailValueSanitize"
            >
            </a>
        </div>

        <div 
            v-if="companyCodesValues"
            class="main-contact-block__codes body-text1"
            v-html="$sanitize(companyCodesValues)"
        >
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeMainContactsPhones } from '~/types/content-type-main-contacts.interface'

@Component({})
export default class ComponentMainContactBlock extends Vue {
    @Prop() public phonesValues!: IContentTypeMainContactsPhones[]
    @Prop() public addressValue!: string;
    @Prop() public emailValue!: string;
    @Prop() public companyCodesValues!: string;
    @Prop() public companyNameValue!: string;

    public $sanitize!: (value: string, options?: any) => string

    public get emailHref(): string {
        return this.$sanitize(
            `mailto:${this.emailValue}`,
            {
                allowedTags: [],
                allowedAttributes: {},
                allowedStyles: {}
            }
        ).trim();
    }

    public get emailValueSanitize(): string | null {
        return this.emailValue ? this.$sanitize(
            this.emailValue,
            {
                allowedTags: [],
                allowedAttributes: {},
                allowedStyles: {}
            }
        ).trim() : null;
    }

}
</script>

<style lang="scss" scoped>
.main-contact-block {
    border-radius: 8px;
    @include media-lg {
        background: $color-golden-light;
        padding: $space-24;
    }

    &__title {
        margin-bottom: $space-24;
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

    &__address {
        margin-bottom: $space-32;
        &-item {
            position: relative;
            padding-left: 36px;
            margin-left: 10px;
            text-decoration: none;
            @include media-lg {
                margin-left: 20px;
            }
            &::before {
                content: "";
                position: absolute;
                left: 0;
                top: -3px;
                background-position: center;
                background-size: contain;
                background-repeat: no-repeat;
                width: 22px;
                height: 22px;
            }
            &:not(:last-child) {
                margin-bottom: $space-16;
            }

            &--address {
                &::before {
                    background-image: url('~assets/images/svg/map-marker-outline.svg');
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
        }
    }

}
</style>
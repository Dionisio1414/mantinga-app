<template>
    <div class="contact-block">
        <div 
            v-if="titleValue" 
            class="contact-block__title h6 h6--regular"
            v-html="$sanitize(titleValue)"
        >
        </div>

        <div class="contact-block__address body-text1">
            <div 
                v-if="phoneValue"
                class="contact-block__address-item contact-block__address-item--phone"
                v-html="$sanitize(phoneValue)"
            >
            </div>
            <a :href="emailHref" 
                v-if="emailValue"
                class="contact-block__address-item contact-block__address-item--email"
                v-html="emailValue"
            >
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeMainContactsBlocks } from '~/types/content-type-main-contacts.interface'

@Component({})
export default class ComponentContactBlock extends Vue {
    @Prop() public blocksValues!: IContentTypeMainContactsBlocks

    public $sanitize!: (value: string, options?: any) => string

    public get titleValue(): string {
        return this.blocksValues.title.value ?? null
    }

    public get phoneValue(): string {
        return this.blocksValues.phone.value ?? null
    }

    public get emailHref(): string {
        return this.$sanitize(
            `mailto:${this.blocksValues.email.value}`,
            {
                allowedTags: [],
                allowedAttributes: {},
                allowedStyles: {}
            }
        ).trim();
    }

    public get emailValue(): string {
        return this.$sanitize(
            this.blocksValues.email.value,
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
.contact-block {
    background: $color-golden-light;
    border-radius: 8px;
    padding: $space-24;

    &__title {
        margin-bottom: $space-16;
    }

    &__address {
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

            &--phone {
                &::before {
                    background-image: url('~assets/images/svg/map-marker-outline.svg');
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
<template>
    <NuxtLink 
        :to="localePath({ name: 'projects-slug', params: { slug: projectSlug }})"
        class="project-card"
    >
        <div class="project-card__picture">
            <img class="project-card__image" :src="imageUrl">
        </div>
        <div class="project-card__content">
            <div
                v-if="titleValue"
                :title="titleValue"
                class="project-card__title h6"
                v-html="$sanitize(titleValue)"
            >
            </div>
            <div
                v-if="subtitleValue"
                :title="subtitleValue"
                class="project-card__subtitle body-text1 truncate truncate--2-lines"
                v-html="$sanitize(subtitleValue)"
            >
            </div>
            <div class="project-card__footer">
                <div class="project-card__date overline">{{ projectDate }}</div>
                <svg-icon
                    class="project-card__icon"
                    name="arrow-right"
                    height="24"
                    width="24"
                />
            </div>
        </div>
    </NuxtLink>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { IProjects } from '~/types/projects.interface'

@Component({})
export default class ComponentProjectCard extends Vue {
    @Prop() public cardData!: IProjects

    public get locale(): string {
        return this.$i18n?.locale || 'lt'
    }

    public get projectDate(): string {
        // @ts-ignore
        return this.$dayjs(this.cardData?.date)
        .locale(this.locale)
        .format('MMMM D, YYYY')
    }

    public get projectSlug(): string {
        return this.cardData?.slug || ''
    }

    public get titleValue(): string {
        return this.cardData.name ?? null
    }

    public get subtitleValue(): string {
        return this.cardData.shortDescription ?? null
    }

    public get imageUrl(): string {
        return this.cardData.image ?? ''
    }
}
</script>

<style lang="scss" scoped>
.project-card {
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: $shadow-100;
    height: 100%;
    min-height: 313px;
    transition: box-shadow .25s ease-in-out;
    @include media-lg {
        box-shadow: none;
    }

    &:hover {
        @include media-lg {
            box-shadow: $shadow-200;
            .project-card__content {
                background-color: $color-white;
            }

            .project-card__icon {
                opacity: 1;
            }
        }
    }

    &__title {
        margin-bottom: $space-8;
    }

    &__subtitle {
        margin-bottom: 28px;
    }

    &__picture {
        position: relative;
        height: 185px;
        max-height: 185px;
        overflow: hidden;
    }

    &__image {
        display: block;
        width: 100%;
        max-width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
    }

    &__content {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        width: 100%;
        background-color: $color-white;
        padding: $space-24 $space-24 28px $space-24;
        transition: background-color .25s ease-in-out;
        @include media-lg {
            background-color: transparent;
        }
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;
    }

    &__icon {
        opacity: 1;
        color: $color-golden;
        transition: opacity .25s ease-in-out;
        @include media-lg {
            opacity: 0;
        }
    }
}
</style>
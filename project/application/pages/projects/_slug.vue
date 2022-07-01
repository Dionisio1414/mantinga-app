<template>
    <div>
        <div class="breadcrumbs-mobile">
            <button
                type="button"
                class="breadcrumbs-mobile__link"
                @click="$router.back()"
            >
                <svg-icon name="chevron-left" width="24" height="24" />
                <span
                    class="body-text1 body-text1--bold"
                    v-html="$sanitize($t('common.buttons.back'))"
                >
                </span>
            </button>
        </div>
        <div class="breadcrumbs-desktop">
            <Breadcrumbs :breadcrumbs="breadcrumbs"></Breadcrumbs>
        </div>

        <div class="page__wrapper">
            <div class="page__container">
                <div class="project-inner">
                    <p class="project-inner__date subtitle" v-html="$sanitize(date)" />
                    <div class="project-inner__name h4" v-html="$sanitize(name)" />
                    <NewsShareBlock
                        :news-url="newsUrl"
                        :news-title="name"
                        :news-description="description"
                        :hashtags="metaKeywords"
                        :media="imageSrc"
                    >
                    </NewsShareBlock>
                    <img v-if="imageSrc" class="project-inner__img" :src="imageSrc" />
                </div>
            </div>
        </div>

        <div>
            <ContentTypeRoot
                v-for="(contentType, index) in contentTypes"
                :key="index"
                :content-type="contentType"
                class="content-type"
            >
            </ContentTypeRoot>
        </div>

        <div class="page__wrapper">
            <div class="page__container">
                <NewsShareBlock
                    align="center"
                    :news-url="newsUrl"
                    :news-title="name"
                    :news-description="description"
                    :hashtags="metaKeywords"
                    :media="imageSrc"
                >
                </NewsShareBlock>
                <button
                    class="project-inner__button-to-top btn btn--secondary"
                    @click.prevent="goToTop"
                >
                    <span
                        class="btn-title"
                        v-html="$sanitize($t('news_page.button_to_top'))"
                    >
                    </span>
                </button>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types'
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import { EStatus } from '~/constants/status'
import ContentTypeRoot from '~/components/content-types/ContentTypeRoot.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import NewsShareBlock from '~/components/common/NewsShareBlock.vue'
import { IProjects, IProjectsTranslation } from '~/types/projects.interface'
import { IBreadcrumb } from '~/types/breadcrumb.interface'
import { IContentType } from '~/types/content-type.interface'
import { IProjectMeta } from '~/types/recipes.interface'

@Component({
    components: {
        ContentTypeRoot,
        Breadcrumbs,
        NewsShareBlock
    },
    scrollToTop: true
})
export default class PageProject extends Vue{
    @Getter('projects/projectInner') public project!: IProjects

    public get locale(): string {
        return this.$i18n.locale || 'lt'
    }

    public get translationProject(): IProjectsTranslation {
        return this.project?.translations[this.$i18n.locale] ?? {}
    }

    public get contentTypes(): IContentType[] {
        return this.translationProject?.contentType ?? []
    }

    public get date(): string {
        return this.$dayjs(this.project?.date).locale(this.locale).format('MMMM D, YYYY')
    }

    public get name(): string {
        return this.translationProject?.name || ''
    }

    public get imageSrc(): string {
        return this.project?.image || ''
    }

    public get description(): string {
        return this.translationProject?.shortDescription ?? ''
    }

    public get metaKeywords(): string {
        return this.translationProject?.metaKeywords ?? ''
    }

    public get newsUrl(): string {
        return (process.client && window?.location?.href) || ''
    }

    public get breadcrumbs(): IBreadcrumb[] {
        return [
            {
                key: this.project.name,
                title: this.project.name,
                link: this.project.name,
            }
        ]
    }

    public head(): IProjectMeta {
        return {
            title: this.name,
            meta: [
                {
                    property: 'og:title',
                    content: this.name,
                },
                {
                    property: 'og:image',
                    content: this.imageSrc,
                },
                {
                    property: 'og:description',
                    content: this.project?.metaDescription || '',
                },
                {
                    property: 'og:url',
                    content: process.client ? window?.location?.href : '',
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: 'summary',
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: this.imageSrc,
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: this.name,
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: this.project?.metaDescription || '',
                },
            ],
        }
    }

    public validate({ params }: any): boolean {
        if(!params.slug) {
            return false
        }

        return true
    }

    public async asyncData({ store, params, error}: Context) {
        try {
            const { slug } = params
            await store.dispatch('projects/fetchProjectsInner', slug)

            const status: EStatus = store.getters['projecs/status']

            if (status === EStatus .ERROR) {
                const err: any = store.getters['projects/error']
                throw err
            }
        } catch (err: any) {
            error(err)
        }
    }

    public goToTop(): void {
        window.scrollTo({ behavior: 'smooth', top: 0 })
    }

}
</script>

<style lang="scss" scoped>
.content-type {
  &:not(:first-child) {
    margin-top: 40px;
  }
}

.breadcrumbs-mobile {
  margin-top: 12px;
  margin-left: 16px;

  &__link {
    padding: 12px 8px;
    display: flex;
    align-items: center;
  }

  &__icon {
    margin-right: 8px;
  }
}

.breadcrumbs-desktop {
  display: none;
}

.project-inner {
  &__date {
    text-align: center;
    color: $color-primary-light;
  }

  &__name {
    text-align: center;
    margin: 16px 0 21px 0;
  }

  &__share {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__share-text {
    color: $color-primary-light;
  }

  &__icon {
    margin-left: 24px;
    color: $color-golden;
  }

  &__img {
    margin-top: 21px;
    width: 100%;
    border-radius: 8px;
  }

  &__button-to-top {
    margin: 48px auto 0 auto;
  }
}

@include media-lg {
    .breadcrumbs-desktop {
        display: block;
    }

    .breadcrumbs-mobile {
        display: none;
    }

    .project-inner {
        &__latest-news {
            &:not(:last-child) {
                margin-bottom: 88px;
            }
        }

        &__button-to-top {
            display: none;
        }
    }
}
</style>
<template>
    <div>
        <Breadcrumbs :breadcrumbs="breadcrumbs"></Breadcrumbs>
        <div class="page-contacts">
            <div 
                v-if="pageTitle"
                class="page-contacts__title page-contacts__title--desktop h4"
                v-html="$sanitize(pageTitle)"
            >
            </div>
            <div 
                v-if="pageTitle"
                class="page-contacts__title page-contacts__title--mobile h5"
                v-html="$sanitize(pageTitle)"
            >
            </div>
            <ContentTypeRoot
                v-for="(contentType, index) in contentTypes"
                :key="index"
                :content-type="contentType"
            >
            </ContentTypeRoot>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Getter } from 'nuxt-property-decorator'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import { IBreadcrumb } from '~/types/breadcrumb.interface'
import ContentTypeRoot from '~/components/content-types/ContentTypeRoot.vue'
import { IContentType } from '~/types/content-type.interface'
import { EStatus } from '~/constants/status'
import { Context } from '@nuxt/types'
import { IMetaInfo } from '~/types/meta.interface'

import getRouteForFetchPage  from '~/utils/get-route-for-fetch-page'

@Component({
  components: {
    Breadcrumbs,
    ContentTypeRoot
  }
})
export default class PageRecipesIndex extends Vue {
    @Getter('page-contacts/contentTypes') public contentTypes!: IContentType[]
    @Getter('page-contacts/pageTitle') public pageTitle!: string
    @Getter('page-contacts/metaInfo') public metaInfo!: IMetaInfo

    public get breadcrumbs(): IBreadcrumb[] {
        return [
            {
                key: this.pageTitle,
                title: this.pageTitle,
                link: '/',
            }
        ]
    }

    public head(): any {
        return {
            title: this.metaInfo?.title || this.pageTitle || 'Mantinga',
            meta: [
                {
                hid: 'description',
                name: 'description',
                content: this.metaInfo?.metaDescription || ''
                },
                {
                hid: 'keywords',
                name: 'keywords',
                content: this.metaInfo?.metaKeywords || ''
                },
            ],
        }
    }

    public async asyncData({ store, error, route }: Context) {
        try {
            const slug = getRouteForFetchPage(route.path);

            await store.dispatch('page-contacts/fetchPageContacts', slug)

            const status: EStatus = store.getters['page-contacts/status']

            if (status === EStatus.ERROR) {
                const err: any = store.getters['page-contacts/error']
                throw err
            }
        } catch (err: any) {
            error(err)
        }
    }

}
</script>

<style lang="scss" scoped>
.page-contacts {
    padding-top: $space-32;
    @include media-lg {
        padding-top: 0;
    }

    &__title {
        text-align: center;
        margin-bottom: $space-32;
        @include media-lg {
            margin-bottom: $space-48;
        }

        &--desktop {
            display: none;
            @include media-lg {
                display: block;
            }
        }

        &--mobile {
            @include media-lg {
                display: none;
            }
        }
    }

    .main-contacts {
        margin-bottom: $space-48;
        @include media-lg {
            margin-bottom: $space-88;
        }
    }
}
</style>
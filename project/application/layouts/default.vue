<template>
  <div class="default-layout">
    <SimpleMessageBlock v-if="!browserIsSupported">
      <span v-html="$sanitize($t('common.unsupported_browser_text'))"></span>
    </SimpleMessageBlock>
    <Header />
    <div
      class="default-layout__content"
      :class="{ 'default-layout__content--minimized': isMinimizedHeader }"
    >
      <Nuxt />
    </div>
    <Footer />
    <div class="notifications">
      <div class="notifications__container">
        <client-only>
          <notifications position="bottom left" width="100%">
            <template slot="body" slot-scope="{ item, close }">
              <Notification :item="item" @close="close" />
            </template>
          </notifications>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Getter, Watch } from 'nuxt-property-decorator'
import Header from '~/components/header/Header.vue'
import Footer from '~/components/footer/Footer.vue'

import SimpleMessageBlock from '~/components/common/SimpleMessageBlock.vue'
import ModalNewsletter from '~/components/modals/ModalNewsletter.vue'
import Notification from '~/components/common/Notification.vue'

import {
  EMAIL_STORAGE_KEY,
  LIMIT_VISITED_PAGE,
  MONTH_IN_MS,
  SUBSCRIPTION_TIME_STORAGE_KEY,
} from '~/constants/subscription'
import { NEWSLETTER_MODAL_CONFIG } from '~/constants/modals-config'

@Component({
  components: {
    Header,
    Footer,
    SimpleMessageBlock,
    Notification,
  },
})
export default class LayoutDefault extends Vue {
  @Getter('browser-support/isSupported')
  public browserIsSupported!: boolean

  @Getter('header/isMinimizedHeader')
  public isMinimizedHeader!: boolean

  public visitedPageCount: number = 0
  public $modal: any

  @Watch('$route.path')
  public handleRouteChange(): void {
    if (process.client) {
      const email = window.localStorage.getItem(EMAIL_STORAGE_KEY)

      if (email) {
        return
      }
      this.visitedPageCount++
    }
  }

  @Watch('visitedPageCount')
  public handleVisitedPageCount(value: number): void {
    const email = window.localStorage.getItem(EMAIL_STORAGE_KEY)
    const lastOpenedSubscriptionModal = Number(
      window.localStorage.getItem(SUBSCRIPTION_TIME_STORAGE_KEY)
    )

    if (email) {
      return
    }

    if (
      lastOpenedSubscriptionModal &&
      lastOpenedSubscriptionModal + MONTH_IN_MS > Date.now()
    ) {
      return
    }

    if (value >= LIMIT_VISITED_PAGE) {
      this.$modal.show(ModalNewsletter, null, NEWSLETTER_MODAL_CONFIG)
    }
  }
}
</script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;

  &__content {
    padding-top: $header-height-mobile;
  }
}

@include media-lg {
  .default-layout {
    &__content {
      padding-top: $header-height-desktop;

      &--minimized {
        transform: translateY(-(calc(164px - $header-height-desktop-min)));
      }

    }
  }
}

.notifications {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: block;
  height: 1px;
  z-index: 5000;
  padding: 0 16px;

  &__container {
    position: relative;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
  }
}

@include media-lg {
  .notifications {
    padding: 0 120px;
  }
}
</style>

<template>
  <div class="default-layout">
    <SimpleMessageBlock v-if="!browserIsSupported">
      <span v-html="$sanitize($t('common.unsupported_browser_text'))"></span>
    </SimpleMessageBlock>
    <ManagersHeader />
    <div class="default-layout__content default-layout__content--minimized">
      <Nuxt />
    </div>
    <Footer v-if="!isAuthorized" />
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
import { Component, Getter } from 'nuxt-property-decorator'
import ManagersHeader from '~/components/header/ManagersHeader.vue'
import Footer from '~/components/footer/Footer.vue'

import SimpleMessageBlock from '~/components/common/SimpleMessageBlock.vue'
import Notification from '~/components/common/Notification.vue'

@Component({
  components: {
    ManagersHeader,
    SimpleMessageBlock,
    Notification,
    Footer,
  },
})
export default class LayoutDefault extends Vue {
  @Getter('browser-support/isSupported')
  public browserIsSupported!: boolean

  @Getter('auth/isAuthorized')
  public isAuthorized!: boolean
}
</script>

<style lang="scss" scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;

  &__content {
    padding-top: $header-height-mobile;
    height: 100%;
  }
}

@include media-lg {
  .default-layout {
    &__content {
      padding-top: $header-height-desktop;

      &--minimized {
        padding-top: $header-height-desktop-min;
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

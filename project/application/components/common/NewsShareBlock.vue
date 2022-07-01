<template>
  <div class="news-share-block" :class="[`news-share-block--${align}`]">
    <p
      class="news-share-block__text subtitle"
      v-html="$sanitize($t('news_page.share'))"
    />
    <div class="news-share-block__icons">
      <ShareNetwork
        v-for="(network, i) in listOfNetworks"
        :key="i"
        :network="network"
        :url="newsUrl"
        :title="newsTitle"
        :description="newsDescription"
        :quote="facebookQuote"
        :hashtags="hashtags"
        :media="media"
        class="news-share-block__icon-container"
      >
        <svg-icon
          class="news-share-block__icon"
          :name="network"
          width="28"
          height="28"
        />
      </ShareNetwork>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

import Bowser from 'bowser'

@Component({
  components: {},
})
export default class ComponentNewsShareBlock extends Vue {
  @Prop({ default: 'right' })
  public align!: string

  @Prop({ default: '' })
  public newsUrl!: string

  @Prop({ default: '' })
  public newsTitle!: string

  @Prop({ default: '' })
  public newsDescription!: string

  @Prop({ default: '' })
  public facebookQuote!: string

  @Prop({ default: '' })
  public hashtags!: string

  @Prop({ default: '' })
  public twitterUser!: string

  @Prop({ default: '' })
  public media!: string

  public listOfNetworks: string[] = [
    'facebook',
    // 'messenger',
    'linkedin',
    'twitter',
  ]

  $app: any

  public mounted(): void {
    if (process.client) {
      const browser = Bowser.getParser(window.navigator.userAgent)
      const isMobileBrowser = browser.satisfies({
        mobile: {
          safari: '>=9',
          'android browser': '>3.10',
        },
      })

      if (isMobileBrowser) {
        this.listOfNetworks.push('messenger')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.news-share-block {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;

  &--right {
    justify-content: flex-end;
  }

  &--left {
    justify-content: flex-start;
  }

  &--center {
    justify-content: center;
  }

  &__text {
    color: $color-primary-light;
  }

  &__icons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 8px;
  }

  &__icon {
    color: $color-golden;
  }

  &__icon-container {
    &:not(:first-child) {
      margin-left: 24px;
    }
  }
}

@include media-lg {
  .news-share-block {
    flex-direction: row;

    &__icon-container {
      margin-left: 24px;
    }
  }
}
</style>

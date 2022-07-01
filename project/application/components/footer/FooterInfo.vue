<template>
  <div class="footer-info">
    <div class="footer-info__container">
      <p
        class="footer-info__copyright caption"
        v-html="$sanitize($t('footer.info.copyright', { n: year }))"
      />
      <div class="footer-info__link">
        <NuxtLink
          :to="{ path: `/${$t('routes.privacy_policy')}` }"
          class="footer-info__link link"
          v-html="$sanitize($t('footer.info.privacy_policy'))"
        />
        |
        <NuxtLink
          to="/"
          class="footer-info__link link"
          v-html="$sanitize($t('footer.info.marketing_policy'))"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class ComponentFooterInfo extends Vue {
  public get year(): number {
    return new Date().getFullYear()
  }
}
</script>

<style lang="scss" scoped>
.footer-info {
  padding: 24px 30px;
  background-color: $color-primary-dark;
  width: 100%;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__copyright {
    color: $color-golden;
    margin-bottom: 16px;
  }

  &__link {
    color: $color-white;
  }
}

@include media-lg {
  .footer-info {
    padding: 16px 120px;

    &__container {
      flex-direction: row;
      justify-content: space-between;
    }

    &__copyright {
      margin-bottom: 0;
    }

    &__link {
      color: $color-golden;
    }
  }
}
</style>

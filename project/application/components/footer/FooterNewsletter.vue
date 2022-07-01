<template>
  <div class="footer-newsletter">
    <svg-icon
      class="footer-newsletter__icon"
      name="email"
      width="32"
      height="32"
    />
    <h2
      class="h5 footer-newsletter__header"
      v-html="$sanitize($t('footer.newsletter.header'))"
    />
    <p
      class="body-text1 footer-newsletter__text"
      v-html="$sanitize($t('footer.newsletter.text'))"
    />
    <FooterNewsletterForm />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

import FooterNewsletterForm from '~/components/forms/FooterNewsletterForm.vue'

@Component({
  components: {
    FooterNewsletterForm,
  },
})
export default class ComponentFooterNewsletter extends Vue {}
</script>

<style lang="scss" scoped>
.footer-newsletter {
  display: flex;
  align-items: center;
  flex-direction: column;
  border-bottom: 2px solid $color-primary-light;
  padding-bottom: 48px;

  &__icon {
    color: $color-golden;
    margin-bottom: 16px;
  }

  &__header {
    color: $color-white;
    text-align: center;
  }

  &__text {
    color: $color-white;
    text-align: center;
    margin: 16px 0 32px 0;
  }
}

@include media-lg {
  .footer-newsletter {
    padding-bottom: 64px;
    width: 100%;

    background-image: url('assets/images/leaf_group_2.svg');
    background-repeat: no-repeat;
    background-position: right;

    &__icon {
      display: none;
    }
  }
}
</style>

<template>
  <div class="accordion-container">
    <div class="content-type-accordion">
      <Accordion
        v-for="(block, i) in blocks"
        :key="i"
        :header="block && block.title && block.title.value"
        class="content-type-accordion__item"
      >
        <template #content>
          <div
            class="content-type-accordion__content subtitle"
            v-html="$sanitize(block && block.text && block.text.value)"
          />
        </template>
      </Accordion>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import Accordion from '~/components/common/Accordion.vue'

import {
  IContentTypeAccordionProperties,
  IContentTypeAccordionItem,
} from '~/types/content-type-accordion.interface'

@Component({
  components: {
    Accordion,
  },
})
export default class ComponentContentTypeAccordion extends Vue {
  @Prop()
  public properties!: IContentTypeAccordionProperties

  public get blocks(): IContentTypeAccordionItem[] {
    return this.properties?.blocks?.value || []
  }
}
</script>

<style lang="scss" scoped>
.accordion-container {
  padding: 0 16px;
}
.content-type-accordion {
  max-width: 1200px;
  margin: 0 auto;

  &__item {
    &:not(:last-child) {
      margin-bottom: 64px;
    }
  }

  &__content {
    padding-top: 40px;
  }
}

@include media-lg {
  .accordion-container {
    padding: 0 120px;
  }

  .content-type-accordion {
    &__item {
      &:not(:last-child) {
        margin-bottom: 64px;
      }
    }
  }
}
</style>

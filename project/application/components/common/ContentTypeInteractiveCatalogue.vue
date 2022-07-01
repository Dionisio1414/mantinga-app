<template>
  <div class="content-type-catalogue">
    <div class="content-type-catalogue__container">
      <iframe
        :src="iframeUrl"
        width="100%"
        class="content-type-catalogue__iframe"
        frameborder="0"
        scrolling="no"
        allowtransparency
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { IContentTypeInteractiveCatalogueProperties } from '~/types/content-type-interactive-catalogue.interface'
@Component({
  components: {},
})
export default class ComponentContentTypeInteractiveCatalogue extends Vue {
  @Prop()
  public properties!: IContentTypeInteractiveCatalogueProperties;

  public get iframeUrl(): string {
    return this.properties?.url?.value || ''
  }
}
</script>

<style lang="scss" scoped>
.content-type-catalogue {
  width: 100%;
  padding: 0 16px;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 0px;
  }

  &__iframe {
    height: 718px; // fallback
    height: 100vh;
  }
}

@include media-lg {
  .content-type-catalogue {
    padding: 0 120px;
  }
}
</style>

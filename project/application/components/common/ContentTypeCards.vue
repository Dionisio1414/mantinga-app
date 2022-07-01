<template>
  <div class="content-type-cards">
    <div class="content-type-cards__container">
      <InfoCard
        v-for="(card, i) in cards"
        :key="i"
        :properties="card"
        class="content-type-cards__card"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import InfoCard from '~/components/cards/InfoCard.vue'

import {
  IContentTypeCardsEntity,
  IContentTypeCardsProperties,
} from '~/types/content-type-cards.interface'

@Component({
  components: {
    InfoCard,
  },
})
export default class ComponentContentTypeCards extends Vue {
  @Prop()
  public properties!: IContentTypeCardsProperties

  public get cards(): IContentTypeCardsEntity[] {
    return this.properties?.blocks?.value || []
  }
}
</script>

<style lang="scss" scoped>
.content-type-cards {
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

  &__card {
    &:not(:last-child) {
      margin-bottom: 180px;
    }
  }
}

@include media-lg {
  .content-type-cards {
    padding: 0 120px;
  }
}
</style>

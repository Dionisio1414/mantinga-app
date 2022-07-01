<template>
  <div class="card-list">
    <p class="card-list__headline h2">{{ titleValue }}</p>
    <div class="card-list__container">
      <InfoCard
        v-for="(card, i) in cards"
        :key="i"
        :properties="card"
        class="card-list__card"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import InfoCard from '~/components/cards/InfoCard.vue'

import {
  IContentTypeCardListEntity,
  IContentTypeCardListProperties,
} from '~/types/content-type-card-list.interface'

@Component({
  components: {
    InfoCard,
  },
})
export default class ComponentContentTypeCardList extends Vue {
  @Prop()
  public properties!: IContentTypeCardListProperties

  public get cards(): IContentTypeCardListEntity[] {
    return this.properties?.blocks?.value || []
  }

  public get titleValue(): string {
    return this.properties?.Title?.value || ''
  }
}
</script>

<style lang="scss" scoped>
.card-list {
  width: 100%;
  padding: 0 16px;

  &__container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 24px;
    padding: 4px 0px;
  }

  &__headline {
    text-align: center;
    margin-bottom: 32px;
  }
}

@include media-lg {
  .card-list {
    padding: 0 120px;
  }
}
</style>

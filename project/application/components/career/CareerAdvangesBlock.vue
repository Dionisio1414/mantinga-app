<template>
  <div class="advantages-block">
    <h2 class="advantages-block__heading h4">Kodėl verta dirbti pas mus?</h2>
    <div class="advantages-block__grid">
      <div v-for="(card, i) in cards" :key="i" class="advantages-block__card">
        <h6 class="h6" v-html="$sanitize($t(card.title))" />
        <svg-icon
          class="advantages-block__card-icon"
          :name="card.icon"
          width="72"
          height="72"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({})
export default class ComponentCareerAdvantagesBlock extends Vue {
  public cards = [
    {
      title: 'career_page.advantage_1',
      icon: 'time',
    },
    {
      title: 'career_page.advantage_2',
      icon: 'graph',
    },
    {
      title: 'career_page.advantage_3',
      icon: 'warranty',
    },
  ]
}
</script>

<style lang="scss" scoped>
.advantages-block {
  width: 100%;

  &__heading {
    text-align: center;
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 24px;
  }

  &__card {
    background-color: $color-golden-light;
    border-radius: 8px;
    padding: 32px 24px;
    text-align: center;
    width: 100%;
    height: auto;
  }

  &__card-icon {
    margin-top: 24px;
    color: $color-golden
  }
}

@include media-lg {
  .advantages-block {
    &__grid {
      flex-direction: row;
    }
  }
}
</style>

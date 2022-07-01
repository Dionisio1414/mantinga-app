<template>
  <div class="positions-list">
    <h2
      class="positions-list__heading h4"
      v-html="$sanitize($t('career_page.position_title'))"
    />
    <div class="positions-list__grid">
      <NuxtLink v-for="(job, i) in jobs" :key="i" :to="localePath({name: 'career-offer-id', params: {id: job.id}})">
        <JobCard :text="job && job.name" />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import JobCard from '~/components/cards/JobCard.vue'
import { IJob } from '~/types/job.interface'

@Component({
  components: {
    JobCard,
  },
})
export default class ComponentCareerPositionsList extends Vue {
  @Prop({ default: () => [] })
  public jobs!: IJob[]
}
</script>

<style lang="scss" scoped>
.positions-list {
  &__grid {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 32px;
  }

  &__heading {
    text-align: center;
  }
}

@include media-lg {
  .positions-list {
    &__grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
  }
}
</style>

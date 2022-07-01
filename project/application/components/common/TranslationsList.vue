<template>
  <div class="translations-list">
    <svg-icon
      v-for="(translation, i) in translations"
      :key="i"
      :name="`flag-${translation}`"
      width="24"
      height="24"
      class="translations-list__icon"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ComponentTranslationsList extends Vue {
  @Prop({ default: () => [] })
  public translations!: string[]
}
</script>

<style lang="scss" scoped>
.translations-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
</style>

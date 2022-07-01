<template>
  <div class="message">
    <div class="message__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({})
export default class ComponentSimpleMessageBlock extends Vue {}
</script>

<style lang="scss" scoped>
.message {
  color: $color-primary-regular;
  font-size: 14px;
  line-height: 1.2307692307692308;
  text-align: center;
  background: $color-white;
  letter-spacing: -0.0033em;
  padding: 13px 10px 10px;
  z-index: 2;
  box-shadow: 0px 6px 12px 2px rgba(57, 71, 79, 0.1),
    0px 8px 24px -4px rgba(57, 71, 79, 0.08);
}
</style>

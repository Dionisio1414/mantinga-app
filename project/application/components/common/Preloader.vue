<template>
  <div class="animation_wrap">
    <svg
      id="m_symbol_1"
      class="m_symbol"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.10362 9.35065C2.85427 10.3481 0.883117 19.5325 0 24C2.33766 23.6364 8.63369 23.2192 13.8569 22.5974C20.4023 21.8182 22.74 17.9221 23.3634 15.7403C23.8621 13.9948 25.2208 4.51948 26 0C21.3247 0.311688 11.5192 1.21558 8.40232 2.33766C4.50621 3.74026 3.41531 8.1039 3.10362 9.35065Z"
        fill="#EC1C24"
      />
    </svg>

    <svg
      id="m_symbol_2"
      class="m_symbol"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.10362 9.35065C2.85427 10.3481 0.883117 19.5325 0 24C2.33766 23.6364 8.63369 23.2192 13.8569 22.5974C20.4023 21.8182 22.74 17.9221 23.3634 15.7403C23.8621 13.9948 25.2208 4.51948 26 0C21.3247 0.311688 11.5192 1.21558 8.40232 2.33766C4.50621 3.74026 3.41531 8.1039 3.10362 9.35065Z"
        fill="#EC1C24"
      />
    </svg>

    <svg
      id="m_symbol_3"
      class="m_symbol"
      viewBox="0 0 26 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.10362 9.35065C2.85427 10.3481 0.883117 19.5325 0 24C2.33766 23.6364 8.63369 23.2192 13.8569 22.5974C20.4023 21.8182 22.74 17.9221 23.3634 15.7403C23.8621 13.9948 25.2208 4.51948 26 0C21.3247 0.311688 11.5192 1.21558 8.40232 2.33766C4.50621 3.74026 3.41531 8.1039 3.10362 9.35065Z"
        fill="#EC1C24"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'

@Component({})
export default class ComponentPreloader extends Vue {}
</script>

<style lang="scss" scoped>
.animation_wrap {
  height: 24px;
  display: flex;
}

.m_symbol {
  animation: pulse 2s linear infinite;
}

#m_symbol_1,
#m_symbol_3 {
  height: 50%;
  margin-top: auto;
  margin-bottom: auto;
}

#m_symbol_2 {
  height: 100%;
  animation-delay: 0.25s;
}

#m_symbol_3 {
  animation-delay: 0.35s;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(0.75);
    opacity: 0.1;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>

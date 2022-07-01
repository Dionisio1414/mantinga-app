<template>
  <div class="modal-info-loader">
    <Preloader />
    <div class="modal-info-loader__content">
      <p class="body-text1" v-html="$sanitize(message)" />
    </div>
    <div class="modal-info-loader__footer">
      <button class="btn btn--white" type="button" @click="close">
        <span class="btn-title" v-html="$sanitize('Atšaukti')" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import Preloader from '~/components/common/Preloader.vue'

@Component({
  components: {
    Preloader,
  },
})
export default class ComponentModalInfoLoader extends Vue {
  @Prop({ default: '' })
  public message!: string

  public close(): void {
    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
.modal-info-loader {
  padding: 24px 32px;

  &__content {
      margin-top: 24px;
  }

  &__footer {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
    gap: 24px;
  }
}
</style>

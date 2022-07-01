<template>
  <div class="download-zip">
    <svg-icon
      class="download-zip__icon"
      name="cloud-download"
      width="24"
      height="24"
    />
    <button
      class="body-text1 body-text1--link"
      @click="downloadZip"
      v-html="$sanitize(buttonText)"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'

@Component({
  components: {},
})
export default class ComponentDownloadZip extends Vue {
  @Prop({ default: '' })
  public buttonText!: string

  @Prop()
  public link!: string;

  public downloadZip(): void {
    this.$emit('downloadZip')
  }
}
</script>

<style lang="scss" scoped>
.download-zip {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px;
  width: 100%;

  &__icon {
    margin-right: 8px;
  }

  &__link {
    font-weight: bold;
  }
}
</style>

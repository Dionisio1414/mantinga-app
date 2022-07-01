<template>
  <div class="file-input">
    <input
      v-show="false"
      ref="file_input"
      type="file"
      :accept="acceptFiles"
      @input="handleFile"
    />
    <template v-if="value">
      <div class="file-input__file">
        <p class="">{{ value && value.name }}</p>
        <button
          class="file-input__remove-btn"
          type="button"
          @click="removeFile"
        >
          <svg-icon name="close" width="24" height="24" />
        </button>
      </div>
    </template>
    <template v-else>
      <button type="button" class="btn btn--alternative" @click="pickFile">
        <svg-icon name="text-box-plus" width="24" height="24" />
        <span
          class="btn-title"
          v-html="$sanitize($t('common.buttons.attach_document'))"
        />
      </button>
      <p class="file-input__text file-input__text--desktop body-text1">
        <span v-html="$sanitize($t('common.max_file_size'))" />
        {{ `${maxSize}MB, ${acceptFormats}` }}
      </p>
      <p class="file-input__text file-input__text--mobile body-text3">
        <span v-html="$sanitize($t('common.max_file_size'))" />
        {{ `${maxSize}MB, ${acceptFormats}` }}
      </p>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'nuxt-property-decorator'
import { EMessageTypes } from '~/constants/message-types'

@Component({
  components: {},
})
export default class ComponentFileInput extends Vue {
  @Prop({ default: null })
  public value!: any

  @Prop({ default: '*' })
  public acceptFiles!: string

  // In MB
  @Prop({ default: 10 })
  public maxSize!: number

  @Watch('value')
  public handleValue(value: any): void {
    if (!value) {
      this.fileInput.value = ''
    }
  }

  public get fileInput(): any {
    return this.$refs.file_input
  }

  public get acceptFormats(): string {
    return this.acceptFiles.split('.').join('')
  }

  public pickFile(): void {
    this.fileInput.click()
  }

  public handleFile(e: any): void {
    const file = e.target.files[0]

    const fileSize = file.size / 1024 / 1024

    if (fileSize > this.maxSize) {
      this.$notify({
        text: this.$t('common.max_file_size').toString() + this.maxSize + 'MB',
        type: EMessageTypes.WARNING,
      })
      return
    }

    this.$emit('input', file)
  }

  public removeFile(): void {
    this.$emit('input', null)

    this.fileInput.value = ''
  }
}
</script>

<style lang="scss" scoped>
.file-input {
  display: flex;
  align-items: center;
  gap: 24px;

  &__text {
    &--desktop {
      display: none;
    }
  }

  &__file {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__remove-btn {
    display: flex;
  }
}

@include media-lg {
  .file-input {
    &__text {
      &--desktop {
        display: inline;
      }

      &--mobile {
        display: none;
      }
    }
  }
}
</style>

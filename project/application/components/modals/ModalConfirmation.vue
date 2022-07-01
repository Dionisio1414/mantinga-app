<template>
  <div class="modal-confirmation">
    <div class="modal-confirmation__content">
      <p class="body-text1" v-html="$sanitize(message)" />
    </div>
    <div class="modal-confirmation__buttons">
      <button
        class="btn btn--alternative"
        type="button"
        @click="confirm"
      >
        <span
          class="btn-title"
          v-html="$sanitize(actionButtonTitle || $t('common.buttons.delete'))"
        />
      </button>
      <button class="btn btn--white" type="button" @click="close">
        <span class="btn-title" v-html="$sanitize(cancelButtonTitle || $t('common.buttons.no'))" />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { IDictionary } from '~/types/dictionary.interface';

@Component({})
export default class ComponentModalConfirmation extends Vue {
  @Prop({ default: '' })
  public message!: string

  @Prop({ default: () => {}})
  public params!: IDictionary<any>;

  @Prop({ default: ''})
  public cancelButtonTitle!: string;

  @Prop({ default: ''})
  public actionButtonTitle!: string;

  public close(): void {
    this.$emit('close', { confirm: false })
  }

  public confirm(): void {
    this.$emit('close', { confirm: true, ...this.params })
  }
}
</script>

<style lang="scss" scoped>
.modal-confirmation {
  padding: 24px 32px;

  &__buttons {
    margin-top: 32px;
    display: flex;
    justify-content: flex-end;
    gap: 24px;
  }
}
</style>

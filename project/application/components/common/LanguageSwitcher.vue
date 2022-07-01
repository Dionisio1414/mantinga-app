<template>
  <client-only>
    <v-popover offset="8">
      <button class="language-switcher tooltip-target b3">
        <svg-icon :name="`flag-${currentLocale}`" width="24" height="24" />
      </button>

      <template slot="popover">
        <div class="language-switcher__list">
          <button
            v-for="language in languages"
            :key="language.code"
            v-close-popover
            class="language-switcher__item"
            @click="changeLanguage(language.code)"
          >
            <svg-icon
              class="language-switcher__icon"
              :name="`flag-${language.code}`"
              width="24"
              height="24"
            />
            <span class="body-text1">{{ language.name }}</span>
          </button>
        </div>
      </template>
    </v-popover>
  </client-only>
</template>

<script lang="ts">
import Vue from 'vue'
import { Action, Component } from 'nuxt-property-decorator'
import { LANGUAGES } from '~/constants/languages'

@Component({})
export default class ComponentLanguageSwitcher extends Vue {
  @Action('locale/updateLocale')
  public updateLocale!: (locale: string) => void

  public languages = LANGUAGES
  public $i18n: any

  public get currentLocale(): string {
    return this.$i18n.locale
  }

  public changeLanguage(code: string): void {
    this.updateLocale(code)
  }
}
</script>

<style lang="scss" scoped>
.language-switcher {
  width: 48px;
  height: 48px;

  &__item {
    cursor: pointer;
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  &__icon {
    margin-right: 16px;
  }
}
</style>

<template>
  <NuxtLink
    :to="localePath({name: 'news-slug', params: { slug: slug }})"
    class="news-card"
    :class="{ 'news-card--with-shadow': withShadow }"
  >
    <div class="news-card__img-container">
      <img class="news-card__img" :src="newsImage" />
    </div>
    <div class="news-card__content">
      <p class="news-card__title body-text1 truncate truncate--3-lines">
        {{ newsName }}
      </p>
      <div class="news-card__footer">
        <p class="news-card__date overline">{{ newsDate }}</p>
        <svg-icon
          class="news-card__icon"
          name="arrow-right"
          height="24"
          width="24"
        />
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'nuxt-property-decorator'
import { IArticle, IArticleTranslation } from '~/types/articles.interface'

@Component({})
export default class ComponentNewsCard extends Vue {
  @Prop()
  public properties!: IArticle

  @Prop({ default: false })
  public withShadow!: boolean

  public $i18n: any

  public get locale(): string {
    return this.$i18n?.locale || 'lt'
  }

  public get translatedItem(): IArticleTranslation {
    return this.properties?.translations[this.locale] || null
  }

  public get newsImage(): string {
    return this.properties?.image || ''
  }

  public get newsName(): string {
    return this.translatedItem?.name || ''
  }

  public get newsDate(): string {
    // @ts-ignore
    return this.$dayjs(this.properties?.date)
      .locale(this.locale)
      .format('MMMM D, YYYY')
  }

  public get slug(): string {
    return this.properties?.slug || ''
  }
}
</script>

<style lang="scss" scoped>
.news-card {
  box-shadow: $shadow-100;
  border-radius: 8px;
  width: auto;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  min-height: 361px;

  &__img-container {
    height: 185px;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  &__img {
    object-fit: cover;
    object-position: center;
    height: 100%;
    width: 100%;
  }

  &__content {
    padding: 16px 24px;
    width: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__date {
    color: $color-primary-light;
  }

  &__footer {
    margin-top: 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__icon {
    color: $color-golden;
    opacity: 0;
  }
}

@include media-lg {
  .news-card {
    box-shadow: none;
    transition: 200ms;

    &:hover {
      box-shadow: $shadow-100;

      .news-card {
        &__icon {
          opacity: 1;
        }
      }
    }

    &--with-shadow {
      box-shadow: $shadow-100;

      &:hover {
        box-shadow: $shadow-200;
      }
    }

    &__content {
      padding: 24px;
    }
  }
}
</style>

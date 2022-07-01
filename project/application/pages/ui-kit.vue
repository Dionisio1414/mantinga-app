<template>
  <div class="page ui-kit">
    <div class="page__wrapper">
      <div class="page__container">
        <h2 class="h1">Typography</h2>
        <p class="h1">H1/Calibri/Light/300/95px</p>
        <p class="h2">H2/Calibri/Light/300/59px</p>
        <p class="h3">H3/Calibri/Regular/400/48px</p>
        <p class="h4">H4/Calibri/Regular/400/34px</p>
        <p class="h5">H5/Calibri/Regular/400/28px</p>
        <p class="h6">H6/Calibri/Bold/600/22px</p>
        <br />
        <p class="subtitle">Subtitle/Calibri/Regular/500/18px</p>
        <p class="subtitle subtitle--bold">
          Subtitle Bold/Calibri/Bold/600/18px
        </p>
        <p class="subtitle subtitle--link">
          Subtitle Link/Calibri/Regular/600/18px
        </p>
        <br />
        <p class="body-text1">Body1/Avenir Next/Book/400/16px</p>
        <p class="body-text1 body-text1--medium">
          Body1 Medium/Gotham/Medium/500/16px
        </p>
        <p class="body-text1 body-text1--bold">
          Body1 Bold/Gotham/Bold/600/16px
        </p>
        <br />
        <p class="btn-title">BUTTON/Avenir Next/Bold/700/14px</p>
        <br />
        <p class="caption--medium">Caption Medium/Gotham/Medium/500/12px</p>
        <br />
        <p class="overline">OVERLINE/Avenir Next/Medium/500/10px</p>
        <br />
        <p class="tab-title">Tab/Avenir Next/Bold/700/12px</p>
        <br />
        <p class="h4">Paragraph style</p>
        <p class="paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan
          et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus
          mollis orci, sed rhoncus sapien nunc eget odio.
        </p>
        <br />

        <h2 class="h1">Icons</h2>
        <div class="icons">
          <svg-icon name="favourite-filled" width="24" height="24" />
          <svg-icon name="favourite" width="24" height="24" />
          <svg-icon name="chevron-left" width="24" height="24" />
          <svg-icon name="chevron-right" width="24" height="24" />
          <svg-icon name="chevron-up" width="24" height="24" />
          <svg-icon name="chevron-down" width="24" height="24" />
          <svg-icon name="email" width="24" height="24" />
          <svg-icon name="search" width="24" height="24" />
          <svg-icon name="dairy-free" width="24" height="24" />
          <svg-icon name="gluten-free" width="24" height="24" />
          <svg-icon name="vegan" width="24" height="24" />
          <svg-icon name="open-in-new" width="24" height="24" />
          <svg-icon name="cloud-download" width="24" height="24" />
          <svg-icon name="arrow-right" width="24" height="24" />
          <svg-icon name="arrow-left" width="24" height="24" />
          <svg-icon name="arrow-up" width="24" height="24" />
          <svg-icon name="arrow-down" width="24" height="24" />
          <svg-icon name="play-circle" width="24" height="24" />
          <svg-icon name="play" width="24" height="24" />
          <svg-icon name="flag-ru" width="24" height="24" />
          <svg-icon name="flag-en" width="24" height="24" />
          <svg-icon name="flag-ee" width="24" height="24" />
          <svg-icon name="flag-lv" width="24" height="24" />
          <svg-icon name="flag-lt" width="24" height="24" />
          <svg-icon name="close" width="24" height="24" />
          <svg-icon name="newspaper" width="24" height="24" />
          <svg-icon name="chef-hat" width="24" height="24" />
          <svg-icon name="eye" width="24" height="24" />
          <svg-icon name="logout" width="24" height="24" />
          <svg-icon name="filter" width="24" height="24" />
          <svg-icon name="delete" width="24" height="24" />
          <svg-icon name="auto-fix" width="24" height="24" />
          <svg-icon name="list-bulleted" width="24" height="24" />
          <svg-icon name="text-box-plus" width="24" height="24" />
          <svg-icon name="warning" width="24" height="24" />
          <svg-icon name="alert" width="24" height="24" />
          <svg-icon name="circle" width="24" height="24" />
          <svg-icon name="bread" width="24" height="24" />
          <svg-icon name="croisan" width="24" height="24" />
          <svg-icon name="appetizer" width="24" height="24" />
          <svg-icon name="sandwich" width="24" height="24" />
          <svg-icon name="dough-rolling" width="24" height="24" />
          <svg-icon name="serving-dish" width="24" height="24" />
          <svg-icon name="pizza" width="24" height="24" />
          <svg-icon name="account-circle" width="24" height="24" />
          <svg-icon name="leaf" width="24" height="24" />
          <svg-icon name="instagram" width="24" height="24" />
          <svg-icon name="facebook" width="24" height="24" />
          <svg-icon name="linkedin" width="24" height="24" />
          <svg-icon name="pdf" width="24" height="24" />
          <svg-icon name="account-outline" width="24" height="24" />
          <svg-icon name="leaf-gold" width="24" height="24" />
        </div>

        <h2 class="h1">Inputs</h2>
        <div class="inputs">
          <div class="form-group">
            <div class="form-item">
              <FormInput
                name="input"
                type="text"
                label="Label"
                message="Assistive text"
              />
            </div>
            <div class="form-item">
              <FormInput
                name="input"
                type="text"
                label="Label"
                :invalid="true"
                error-message="Assistive text"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="form-item">
              <FormInput name="input" type="text" label="Disabled" disabled />
            </div>
            <div class="form-item"></div>
          </div>

          <div class="form-group">
            <div class="form-item">
              <FormSwitchablePassword label="Password" />
            </div>
            <div class="form-item">
              <FormSwitchablePassword
                label="Error Password"
                error-message="Assistive text"
                :invalid="true"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="form-item">
              <FormSwitchablePassword
                :disabled="true"
                label="Disabled Password"
              />
            </div>

            <div class="form-item"></div>
          </div>

          <div class="form-group">
            <div class="form-item">
              <Multiselect
                id="sorting"
                class="form-select"
                :searchable="false"
                :disabled="false"
                placeholder="Select"
                :options="[]"
              />
            </div>

            <div class="form-item">
              <Multiselect
                id="sorting"
                class="form-select"
                :searchable="false"
                :disabled="true"
                placeholder="Select"
                :options="[]"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="form-item">
              <FormSearchInput v-model="searchQuery" />
            </div>
            <div class="form-item">
              <FormSearchInput v-model="searchQuery" :disabled="true" />
            </div>
          </div>

          <div class="form-group">
            <div class="form-item">
              <input
                id="checkbox"
                class="form-checkbox"
                name="checkbox"
                type="checkbox"
              />
              <label for="checkbox"> Checkbox </label>
            </div>

            <div class="form-item bg-dark">
              <input
                id="checkbox1"
                class="form-checkbox form-checkbox--dark"
                name="checkbox1"
                type="checkbox"
              />
              <label for="checkbox1"> Checkbox </label>
            </div>
          </div>
        </div>
        <h2 class="h1">Notifications</h2>
        <div class="notifications">
          <button
            class="btn btn--secondary btn-success"
            @click.prevent="openNotification('SUCCESS')"
          >
            Success
          </button>
          <button
            class="btn btn--secondary"
            @click.prevent="openNotification('DANGER')"
          >
            Error
          </button>
          <button
            class="btn btn--secondary btn-warning"
            @click.prevent="openNotification('WARNING')"
          >
            Warning
          </button>
          <button
            class="btn btn--golden"
            @click.prevent="openNotification('INFO')"
          >
            Info
          </button>
        </div>
        <div class="labels">
          <h2 class="h1">Labels</h2>
          <div class="labels-wrapper">
            <div class="label label--golden">
              New
            </div>
            <div class="label label--grey">
              60 min.
            </div>
            <div class="label label--grey">
              <svg-icon class="label-icon" name="account-outline" width="24" height="24" />
              4 - 6
            </div>
          </div>
        </div>
        <div class="links">
          <h2 class="h1">Links</h2>
          <div class="links-wrapper">
              <a class="link link--default" href="#">Link text</a>
              <a class="link link--default" href="#">
                <svg-icon class="icon-default" name="cloud-download" width="24" height="24" />
                Link text
              </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'nuxt-property-decorator'
import Multiselect from 'vue-multiselect'
import {
  FormInput,
  FormSwitchablePassword,
  FormSearchInput,
} from '~/components/inputs'

@Component({
  components: {
    FormInput,
    FormSwitchablePassword,
    Multiselect,
    FormSearchInput,
  },
})
export default class PageUiKit extends Vue {
  public searchQuery = ''

  public openNotification(type: string): void {
    this.$notify({
      text: 'Slaptažodžio keitimo nuoroda buvo išsiųsta el. paštu.',
      type,
    })
  }
}
</script>

<style lang="scss" scoped>
.page {
  overflow: hidden;
}

.icons {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  color: $color-black;
  margin-bottom: 40px;
}

.bg-dark {
  background-color: $color-primary-regular;
  padding: 0 20px;
}

.notifications {
  display: flex;
  gap: 20px;
}

.labels,
.links {
  margin-bottom: 40px;
  &-wrapper {
    display: flex;
    gap: 26px;
  }
}

.btn {
  &-warning {
    background-color: $color-warning;
    border-color: $color-warning;
  }

  &-success {
    background-color: $color-success;
    border-color: $color-success;
  }
}
</style>

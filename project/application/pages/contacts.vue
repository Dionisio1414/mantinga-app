<template>
    <main class="page">
        <NuxtChild></NuxtChild>
    </main>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'

@Component({})
export default class PageContacts extends Vue {}
</script>

<style lang="scss" scoped>
    .page {
        display: flex;
        font-weight: bold;
        flex-direction: column;
        font-size: 18px;
        min-height: 100vh;
    }
</style>
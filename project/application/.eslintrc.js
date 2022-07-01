module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [
  ],
  // add your custom rules here
  rules: {
    'vue/no-v-html': 0,
    'import/named': 0,
    'import/order': 0,
    'camelcase': 0
  }
}

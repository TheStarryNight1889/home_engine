export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss','@nuxtjs/color-mode', '@pinia/nuxt',],
    colorMode: {
        preference: 'system', // default theme
        dataValue: 'theme', // activate data-theme in <html> tag
        classSuffix: '',
      },
  });
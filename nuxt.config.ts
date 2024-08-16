// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/supabase', "@nuxtjs/tailwindcss", "dayjs-nuxt", "nuxt-mdi"],
  css: ['~/assets/scss/main.scss'],
  app: {
    head: {
      title: 'ระบบแบบทดสอบ [แอดมิน]',
      meta: [
        { name: 'description', content: 'Default description for Nuxt 3 app' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css'
        }
      ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js',
          tagPosition: 'bodyClose'
        }
      ]
    }
  }
})
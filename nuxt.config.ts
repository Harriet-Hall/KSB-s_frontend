// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  modules: ['@nuxt/test-utils/module', 'nuxt-auth-utils', '@nuxt/ui'],
  runtimeConfig: {
    public: {
      adminEmail: process.env.ADMIN_EMAIL,
      adminPassword: process.env.ADMIN_PASSWORD,
      userEmail: process.env.USER_EMAIL,
      userPassword: process.env.USER_PASSWORD 
    },

  }
})
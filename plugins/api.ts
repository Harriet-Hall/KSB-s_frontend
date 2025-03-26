export default defineNuxtPlugin((nuxtApp) => {

  const api = $fetch.create({
    baseURL: 'http://35.176.157.141:5000/',

  })
  return {
    provide: {
      api
    }
  }
})
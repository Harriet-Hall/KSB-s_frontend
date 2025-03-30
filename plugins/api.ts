export default defineNuxtPlugin((nuxtApp) => {

  const api = $fetch.create({
    baseURL: 'http://18.130.252.77:5000/',

  })
  return {
    provide: {
      api
    }
  }
})
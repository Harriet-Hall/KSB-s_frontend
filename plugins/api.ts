export default defineNuxtPlugin((nuxtApp) => {

  const api = $fetch.create({
    baseURL: 'https://m7sq42zktc.execute-api.eu-west-2.amazonaws.com/prod/',
  })
  return {
    provide: {
      api
    }
  }
})

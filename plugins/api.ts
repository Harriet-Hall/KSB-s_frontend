export default defineNuxtPlugin((nuxtApp) => {

  const api = $fetch.create({
    baseURL: 'https://300hyzvyda.execute-api.eu-west-2.amazonaws.com/prod/',
  })
  return {
    provide: {
      api
    }
  }
})
export default defineNuxtPlugin((nuxtApp) => {

  const api = $fetch.create({
    baseURL: 'https://tf4uqz3vja.execute-api.eu-west-2.amazonaws.com/prod/',
  })
  return {
    provide: {
      api
    }
  }
})

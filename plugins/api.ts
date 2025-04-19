export default defineNuxtPlugin((nuxtApp) => {

  const api = $fetch.create({
    baseURL: 'https://z6q58moouj.execute-api.eu-west-2.amazonaws.com/prod/',
    // baseURL: 'http://18.132.36.228:5000/',
    
  })
  return {
    provide: {
      api
    }
  }
})

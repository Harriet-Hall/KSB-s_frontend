<script setup lang="ts">

const { fetch: refreshSession } = useUserSession()

const credentials = reactive({
  email: '',
  password: '',
})
async function login() {

  $fetch('/api/login', {
    method: 'POST',
    body: credentials
  })

  .then(async () => {
    const {user} = useUserSession()
    await refreshSession()

    console.log(credentials ,"api res")
    if( user.value?.role == "admin"){
      await navigateTo('/full-access')
    }
    else if ( user.value?.role == "user") {
      await navigateTo('/restricted-access')
    }
  })
  .catch(() =>{ 
    alert('Bad credentials')})
}
</script>

<template>
  <div>
  <form class="login-container" @submit.prevent="login">
    <input v-model="credentials.email" type="email" placeholder="Email" />
    <input v-model="credentials.password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</div>
</template>

<style>
.login-container {
  margin: auto;
  width: 30%;
  border: 3px solid green;
  padding: 50px;
}
</style>
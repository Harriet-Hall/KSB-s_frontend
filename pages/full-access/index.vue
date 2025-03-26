
<script setup>

definePageMeta({
  middleware: ['authenticated'],
})
const { user, clear: clearSession } = useUserSession()

async function logout() {
  await clearSession()
  await navigateTo('../login')
}
const { data: ksbs } = await useAPI('/ksbs')
</script>

<template>
  <div class="container">
    <button @click="logout">Logout</button>
  </div>
  <AddKsb/>
  <KsbList :data="ksbs"></KsbList>
</template>
<style>

.container {
  padding-top: 20px;
  padding-bottom:20px;
}
h1 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: large;
}
</style>
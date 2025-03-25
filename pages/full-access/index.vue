
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
  <div>
    <h1>Welcome {{ user.name }}</h1>
    <button @click="logout">Logout</button>
  </div>
  <AddKsb/>
  <KsbList :data="ksbs"></KsbList>
</template>
<script setup>
import _ from "lodash";

definePageMeta({
  middleware: ["authenticated", "role"],
  roles: ["admin"],
});
const { clear: clearSession } = useUserSession();

async function logout() {
  await clearSession();
  await navigateTo("../login");
}

const { data: ksbs } = await useAPI("/ksbs");

const ksbList = ref(ksbs.value);

const handleSortBy = async (property) => {
  if (property == "updated-at") {
    ksbList.value = ksbs.value;
  } else {
    return (ksbList.value = _.orderBy(ksbList.value, [property], ["asc"]));
  }
};

watch(ksbs, (newArray) => {
  ksbList.value = newArray;
});
</script>

<template>
  <head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
  </head>

  <div class="container">
    <button @click="logout">Logout</button>
  </div>
  <button @click="handleSortBy('theme')">Sort by: theme</button>
  <button @click="handleSortBy('updated-at')">Sort by: last updated</button>

  <AddKsb />
  <KsbList :data="ksbList"></KsbList>
</template>
<style>
.container {
  padding-top: 20px;
  padding-bottom: 20px;
}

h1 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: large;
}
</style>

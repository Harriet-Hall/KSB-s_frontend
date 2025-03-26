<script setup>
import _ from "lodash";

definePageMeta({
  middleware: ["authenticated"],
});
const { user, clear: clearSession } = useUserSession();

async function logout() {
  await clearSession();
  await navigateTo("../login");
}

let { data: ksbs } = await useAPI("/ksbs");

let ksbList = ref(ksbs.value);

const handleSortBy = async (property) => {
  return (ksbList.value = _.orderBy(ksbList.value, [property], ["asc"]));
};

watch(ksbs, (newArray) => {
  ksbList.value = newArray;
});

</script>

<template>
  <div class="container">
    <button @click="logout">Logout</button>
  </div>
  <button @click="handleSortBy('theme')">Sort by: theme</button>

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

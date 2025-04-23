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
const { data: ksbs } = await useAPI("/ksbs",  { key: "ksbs" });

const { ksbList, handleSort } = useSort(ksbs.value);
watch(ksbs, (newArray) => {
  ksbList.value = newArray;
});
</script>

<template>
  <div class="container">
    <button @click="logout">Logout</button>
  </div>
  <AddKsb />
  <div class="sortby-button-position-right">
    <SortKsbs sortedValue="updated-at" label="Sort by: last updated" @sorted=handleSort></SortKsbs>
    <SortKsbs sortedValue="theme" label="Sort by: theme" @sorted=handleSort></SortKsbs>
  </div>
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

.sortby-button-position-right {
  position: absolute;
  right: 8px;
}
</style>

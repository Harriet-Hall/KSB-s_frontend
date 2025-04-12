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

const handleSort = async (property) => {
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
  <div class="container">
    <button @click="logout">Logout</button>
  </div>
  <AddKsb />
  <div class="sortby-button-position-right">
    <SortKsbs :data="ksbList" sortedValue="updated-at" label="Sort by: last updated" @sorted=handleSort></SortKsbs>
    <SortKsbs :data="ksbList" sortedValue="theme" label="Sort by: theme" @sorted=handleSort></SortKsbs>
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
.sortby-button-position-right{
  position: absolute;
  right: 8px;
}

</style>

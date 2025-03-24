
<script setup>
const { data: ksbs } = await useAPI('/ksbs')

</script>
<template>
  <AddKsb/>
  <KsbList :data="ksbs"></KsbList>
</template>



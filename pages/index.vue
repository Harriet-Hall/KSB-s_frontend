
<script setup>
const { data: ksbs } = await useAPI('/ksbs')

</script>
<template>
<KsbList :data="ksbs"></KsbList>

</template>



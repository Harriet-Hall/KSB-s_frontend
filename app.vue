<script setup>
const { data: ksbs } = await useAPI('/ksbs')
</script>


<template>
  <div>
    {{ ksbs }}
  </div>
</template>

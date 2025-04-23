<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['sorted']);

const props = defineProps<{
  label: string
  sortedValue: string
}>()
</script>

<template>
<button @click="$emit('sorted', sortedValue)">{{props.label}}</button>
</template> 

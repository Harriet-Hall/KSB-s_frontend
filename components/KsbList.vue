<script setup lang="ts">
const props = defineProps<{

data: Ksb[]
}>();

export type Ksb = {
type: string;
code: number; 
description: string,
updated_at: string;
}

</script>


<template>
<div>
  <table>
    <tbody>
    <tr>
      <th>KSB Type</th>
      <th>KSB Code</th>
      <th>KSB Description</th>
      <th>KSB was last updated at:</th>

    </tr>
    <tr
      v-for="row in props.data"
      >
      <td>{{ row.type }}</td>
      <td>{{ row.code }}</td>
      <td>{{ row.description }}</td>
      <td>{{ row.updated_at }}</td>
    </tr>
  </tbody>

  </table>
</div>
</template>

<script setup lang="ts">
import type { Ksb } from '../types'
const props = defineProps<{

  data: Ksb[]
}>();



const remove = async (id: string) => {
  await useAPI(`/ksbs/${id}`, { method: "DELETE" })
  refreshNuxtData();

};
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
          <th>KSB theme</th>

        </tr>
        <tr v-for="(row, index) in props.data">
          <td>{{ row.type }}</td>
          <td>{{ row.code }}</td>
          <td>{{ row.description }}</td>
          <td>{{ row.updated_at }}</td>
          <td>{{ row.theme }}</td>


          <td><button :aria-label="`delete-id-${index}`" @click="remove(row.id)">Delete</button>
          </td>

        </tr>
      </tbody>
    </table>
  </div>

</template>

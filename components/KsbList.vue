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
  <div class="table-padding">
    <table>
      <caption>Knowledge, Skills and Behaviours</caption>
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
<style scoped>
caption {
  font-size: xxx-large;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding-bottom: 5px;
  padding-top: 10px;


}

.table-padding {
  padding-top: 20px;
}

tbody tr:nth-child(odd) {
  background-color: #f7b8e7;
}

tbody tr:nth-child(even) {
  background-color: #e495e4;
}

tbody tr {
  background-image: url(noise.png);
}

table {
  background-color: #ff33cc;
  font-family: Verdana, Geneva, Tahoma, sans-serif;

}
</style>
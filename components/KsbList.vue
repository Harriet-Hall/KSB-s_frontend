<script setup lang="ts">
import type { Ksb } from '../types'
const props = defineProps<{
  data: Ksb[]
}>();

const editableKsbs = ref<Ksb[]>([...props.data])

const handleRemove = async (id: string) => {
  await useAPI(`/ksbs/${id}`, { method: "DELETE" })
  refreshNuxtData();
};



const handleEdit = async (index: number) => {
  const ksb = editableKsbs.value[index]
  console.log({ksb})
  try {
    await useAPI(`/ksbs/${ksb.id}`, {
      method: "PUT",
      body: {
        type: ksb.type,
        code: ksb.code,
        description: ksb.description
      },
    });

    refreshNuxtData();
    ksb.isModified = false
    
  } catch (error) {
    console.error("Error adding KSB:", error);
  }

}

const update = async (e: Event, index: number, attribute: string) => {
  const target = e.target as HTMLElement
  const value = target.innerHTML

  const ksb = editableKsbs.value[index];

  try {

    if (attribute === 'code') {
      ksb.code = +(value);
    } else if (attribute === 'type') {
      ksb.type = value;
    } else if (attribute === 'description') {
      ksb.description = value;
    }
    ksb.isModified = true

  } catch (error) {
    console.error("Error adding KSB:", error);
  }
}

</script>


<template>

  <div class="table-padding">
    <table>
      <caption>Knowledge, Skills and Behaviours</caption>
      <tbody>
        <tr>
          <th>Edit KSB</th>
          <th>KSB Type</th>
          <th>KSB Code</th>
          <th>KSB Description</th>
          <th>KSB was last updated at:</th>
          <th>KSB theme</th>
          <th>Delete KSB</th>
        </tr>
        <tr v-for="(row, index) in editableKsbs">
          <td><button :aria-label="`update-id-${index}`"  :disabled="!editableKsbs[index].isModified"  @click="handleEdit(index)">Update</button></td>
          <td :data-testid="`type-id-${index}`" contenteditable="true" @input="update($event, index, 'type')">{{
            row.type }}</td>
          <td :data-testid="`code-id-${index}`" contenteditable="true" @input="update($event, index, 'code')">{{
            row.code }}</td>
          <td :data-testid="`description-id-${index}`" contenteditable="true"
            @input="update($event, index, 'description')">{{ row.description }}</td>
          <td>{{ row.updated_at }}</td>
          <td>{{ row.theme }}</td>


          <td><button :aria-label="`delete-id-${index}`" @click="handleRemove(row.id)">Delete</button>
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
  background-color: #d96125;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
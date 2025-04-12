<script setup lang="ts">
import type { Ksb } from '../types'
const props = defineProps<{
  data: Ksb[]
}>();

const editableKsbs = ref<Ksb[]>([...props.data])

watch(() => props.data, (newData) => {
  editableKsbs.value = [...newData]
})


const handleRemove = async (id: string) => {
  await useAPI(`/ksbs/${id}`, { method: "DELETE" })
  refreshNuxtData();
};



const handleEdit = async (index: number) => {
  const ksb = editableKsbs.value[index]
  console.log(ksb, "handleedit")
  try {
    await useAPI(`/ksbs/${ksb.id}`, {
      method: "PUT",
      body: {
        type: ksb.type,
        code: ksb.code,
        description: ksb.description,
        is_complete: ksb.is_complete
      },
    });

    ksb.isModified = false
    refreshNuxtData();
    
  } catch (error) {
    console.error("Error adding KSB:", error);
  }

}

const handleClick = async (index: number) => {
  const ksb = editableKsbs.value[index];
  ksb.isModified = true
}

const handleUpdate = async (e: Event, index: number, attribute: string) => {
  const target = e.target as HTMLElement
  const value = target.textContent!
  const ksb = editableKsbs.value[index];
  try { 
    if (attribute === 'code') {
      ksb.code = +(value);
    } else if (attribute === 'type') {
      ksb.type = value;
    } else if (attribute === 'description') {
      ksb.description = value;
    } else if (attribute === 'is_complete') {
      let boolValue = (value === 'true');
      ksb.is_complete = boolValue 
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
          <th>KSB Last updated</th>
          <th>KSB theme</th>
          <th>Is complete</th>
          <th>Delete KSB</th>
        </tr>
        <tr v-for="(row, index) in editableKsbs">
          <td><button :aria-label="`update-id-${index}`" :disabled="!editableKsbs[index].isModified"
              @click="handleEdit(index)">Update</button></td>
          <td :data-testid="`type-id-${index}`" contenteditable="true" @blur="handleUpdate($event, index, 'type')" @click="handleClick(index)">{{
            row.type }}</td>
          <td :data-testid="`code-id-${index}`" contenteditable="true" @blur="handleUpdate($event, index, 'code')" @click="handleClick(index)">{{
            row.code }}</td>
          <td :data-testid="`description-id-${index}`" contenteditable="true"
            @blur="handleUpdate($event, index, 'description')" @click="handleClick(index)">{{ row.description }}</td>
          <td>{{ row.updated_at }}</td>
          <td>{{ row.theme }}</td>
          <td :data-testid="`isComplete-id-${index}`" contenteditable="true"
            @blur="handleUpdate($event, index, 'is_complete')" @click="handleClick(index)">{{ row.is_complete }}</td>


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


table {
  background-color: #d96125;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
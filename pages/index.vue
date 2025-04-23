<script setup>
import _ from "lodash";

const { data: ksbs } = await useAPI('/ksbs')


const { ksbList, handleSort } = useSort(ksbs.value);
watch(ksbs, (newArray) => {
  ksbList.value = newArray;
});

</script>

<template>
  <div class="sortby-button-position-right">
    <SortKsbs sortedValue="updated-at" label="Sort by: last updated" @sorted=handleSort></SortKsbs>
    <SortKsbs sortedValue="theme" label="Sort by: theme" @sorted=handleSort></SortKsbs>
  </div>
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
          <th>Is complete</th>


        </tr>
        <tr v-for="(ksb) in ksbList">
          <td>{{ ksb.type }}</td>
          <td>{{ ksb.code }}</td>
          <td>{{ ksb.description }}</td>
          <td>{{ ksb.updated_at }}</td>
          <td>{{ ksb.theme }}</td>
          <td>{{ ksb.is_complete }}</td>


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

.container {
  padding-top: 20px;
  padding-bottom: 20px;
}

h1 {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: large;
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
  background-color: #ff7edf;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.sortby-button-position-right {
  position: absolute;
  right: 8px;
}
</style>

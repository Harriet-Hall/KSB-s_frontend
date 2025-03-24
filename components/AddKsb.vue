<script setup lang="ts">


const selectedType = ref<string | null>(null)
const types = ["Knowledge", "Skill", "Behaviour"]

const code = ref<number | null>(null)
const description = ref<string | null>(null)

const selectedTheme = ref<string | null>(null)
const themes = ["code quality", "meeting user needs", "the ci cd pipeline", "refreshing and patching", "operability", "data persistence", "automation", "data security"]

const addKsb = async () => {

  if (!selectedType.value || !code.value || !description.value || !selectedTheme.value) {
    console.log("ERROR - missing values")
    return;
  }

  try {
    await useAPI(`/ksbs/${selectedType.value.toLowerCase()}`, {
      method: 'POST',
      body: {

        code: code.value,
        description: description.value,
        theme: selectedTheme.value
      },
    });

    refreshNuxtData()
    selectedType.value = null;
    code.value = null;
    description.value = null;
    selectedTheme.value = null;

  } catch (error) {
    console.error('Error adding KSB:', error);

  }
};
</script>

<template>
  <h2>Add a KSB</h2>
  <div class="container">
    <label for="type">select type: </label>
    <span><select id="type" v-model="selectedType">
        <option disabled value=""></option>
        <option  name="type" v-for="type in types" :key="type">{{ type }}</option>
      </select>
    </span>
    <label for="code">select code: </label>
    <span>
      <UInput id="code" name="code" v-model="code" type="number" min="1" max="50" />
    </span>
    <label for="description">add description: </label>
    <span>
      <UInput id="description" name="description" v-model="description" type="text" />
    </span>
    <label for="theme">select theme: </label>
    <span>
      <select id="theme" v-model="selectedTheme">
        <option disabled value="">Please select a Ksb theme</option>
        <option name="theme" v-for="theme in themes" :key="theme">{{ theme }}</option>
      </select>
    </span>
  </div>

  <button @click="addKsb()">Add KSB</button>


</template>
<style>
.container {
  display: table;
  width: 100%
}

label {
  display: table-cell;
  width: 1px;
  white-space: nowrap;
}

span {
  display: table-cell;
  padding: 0 4px 0 6px;
}

input {
  width: 70%;
}
</style>
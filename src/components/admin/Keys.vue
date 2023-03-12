<template>
  <div class="row q-gutter-md">
    <q-input outlined readonly v-model="keyValue.key" label="ключ" style="min-width: 400px" />
    <q-input outlined readonly v-model="keyValue.users" label="количество пользователей" />
    <q-input outlined readonly v-model="keyValue.farms" label="количество ферм" />

    <q-btn color="primary" icon="add_circle_outline" outline :disable="keyValue.key !== ''"  />
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";


const keyValue = ref({
  key: '',
  farms: 0,
  users: 0
})

onMounted(async () => {

})

</script>

<style scoped>

</style>

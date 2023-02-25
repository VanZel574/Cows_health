<template>
  <q-page>
    <Table
      title="Животные"
      :headers="headers"
      :rows="animals"
      :actions="actions"
      :loading="tableLoading"
      @onDelete="deleteAnimal"
    />
  </q-page>
</template>

<script setup lang="ts">
import Table from "components/Table.vue";
import { ITableHeader, ITableAction, IAnimal } from "src/utils/models";
import { ref, resolveComponent } from "vue";


const headers: ITableHeader[] = [
  {
    name:'id',
    field:'id',
    label: 'id',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'name',
    field:'name',
    label: 'Имя',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'dateOfBorn',
    field:'dateOfBorn',
    label: 'Дата рождения',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'lactationDay',
    field:'lactationDay',
    label: 'День лактации',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'type',
    field:'type',
    label: 'Тип',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'bolusID',
    field:'bolusID',
    label: 'Id болюса',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'bolusNum',
    field:'bolusNum',
    label: 'Номер болюса',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'calf',
    field:'calf',
    label: 'Нестельная',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name: 'actions',
    label: 'Действия',
    align: 'center',
    headerStyle: 'font-weight: 600;',
    field: 'actions',
    sortable: true
  },
]
const tableLoading = ref(false)
const animals = ref<IAnimal[]>([])

const actions: ITableAction[] = [
  {
    icon: 'fa-regular fa-file',
    color: 'info',
    props: null,
    title: 'Файл разбраковки',
    tooltip: 'Открыть файл разбраковки',
    component: resolveComponent('ReportText')
  },
  {
    icon: 'fa-solid fa-chart-simple',
    color: 'secondary',
    props: null,
    title: 'Результаты разбраковки',
    tooltip: 'Гистограммы',
    component: resolveComponent('ReportView')
  }
]

const deleteAnimal = (animals: IAnimal[]) => {}


</script>

<style scoped>

</style>

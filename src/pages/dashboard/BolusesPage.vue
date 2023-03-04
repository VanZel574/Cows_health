<template>
  <q-page>
    <Table
      title="Болюсы"
      :headers="headers"
      :rows="boluses"
      :actions="actions"
      :loading="tableLoading"
      @onDelete="deleteBolus"
      :flat="false"
    />
  </q-page>
</template>

<script setup lang="ts">
import Table from "components/Table.vue";
import { ITableHeader, ITableAction, IBolus } from "src/utils/models";
import { ref } from "vue";


const headers: ITableHeader[] = [
  {
    name: 'id',
    field:'id',
    label: 'id',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name: 'number',
    field:'number',
    label: 'Номер',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name: 'type',
    field:'type',
    label: 'Тип болюса',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name: 'cowName',
    field:'cowName',
    label: 'Имя животного',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name: 'cowID',
    field:'cowID',
    label: 'id животного',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name: 'status',
    field:'status',
    label: 'Статус',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name: 'chargeLevel',
    field:'chargeLevel',
    label: 'Уровень заряда',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
]
const tableLoading = ref(false)
const boluses = ref<IBolus[]>([])

const actions: ITableAction[] = []


const deleteBolus = () => {}

</script>

<style scoped>

</style>

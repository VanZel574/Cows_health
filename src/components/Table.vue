<template>
  <div class="row q-pa-md">
    <div class="col">
      <q-table
        :title="title"
        :columns="headers"
        :rows="rows"
        v-model:selected="selected"
        selection="multiple"
        row-key="name"
        :loading="loading"
        :visible-columns="visibleColumns()"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              v-for="item in actions"
              round
              :color="item.color"
              :icon="item.icon"
              flat
              @click="showDialog(item, props)"
            >
              <q-tooltip :offset="[10, 10]">{{item.tooltip}}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
        <template v-slot:bottom>
          <q-btn color="negative" label="Удалить" :disable="selected.length===0" @click="deleteRow"></q-btn>
        </template>
      </q-table>
    </div>
  </div>

  <modal :open-dialog="dialog" :title="dialogTitle" @dialog-close="dialog = false">
    <component :is="dialogComponent" :component-props="dialogComponentProps"></component>
  </modal>
</template>

<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { ITableAction, ITableHeader } from "src/utils/models";


interface IProps {
  headers: ITableHeader[];
  rows: object[];
  actions: ITableAction[];
  loading: boolean;
  title: string;
}


const props = withDefaults(defineProps<IProps>(), {
  headers: () => [],
  rows: () => [],
  actions: () => [],
  loading: false,
  title: 'Заголовок'
})
const emit = defineEmits(['onDelete'])

const selected = ref([])

const visibleColumns = () => {
  const filtered = props.headers.filter(item => item.name !== 'id')
  return filtered.map(item => item.name)
}

const dialog = ref(false)
const dialogTitle = ref('')
const dialogComponent = shallowRef()
const dialogComponentProps = ref({})

const showDialog = (action: ITableAction, rowProps: {row: {id: number}}) => {
  dialogTitle.value = action.title
  dialog.value = true
  dialogComponent.value = action.component

  let selectedId: number[] = []

  if (Array.isArray(rowProps)) {
    selectedId = rowProps.map(rowProp => rowProp.id)
  } else {
    selectedId = [rowProps.row.id]
  }

  // build component props
  dialogComponentProps.value = {
    ...props,
    selectedId
  }
}

const deleteRow = () => {
  emit('onDelete', selected.value)
  selected.value = []
}

</script>

<style scoped>

</style>

<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :columns="headers"
        :rows="boluses"
        title="Болюсы"
        selection="multiple"
        :selected="bolusesSelected"
      >
        <template v-slot:bottom>
          <q-btn
            class="q-ml-sm"
            color="negative"
            :disable="bolusesSelected.length < 1"
            label="Удалить"
            icon="delete"
            @click="removeBoluses"
          />
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              v-for="action in bolusesActions"
              round
              :color="action.color"
              :icon="action.icon"
              flat
              @click="showDialog(action, props)"
            >
              <q-tooltip :offset="[10, 10]">{{action.tooltip}}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>

  <modal :open-dialog="dialog" :title="dialogTitle" @dialog-close="dialog = false">
    <component :is="dialogComponent" :component-props="dialogComponentProps"></component>
  </modal>
</template>

<script setup lang="ts">
import Modal from "components/Modal.vue";
import Statistic from "components/boluses/Statistic.vue";
import {ITableHeader, IBolus, ITableAction} from "src/utils/models";
import {ref, shallowRef, watchEffect} from "vue";
import {useBoluses} from "stores/boluses";
import {useBarn} from "stores/barns";


const dialogComponents = {
  Statistic
}
const bolusesStore = useBoluses()
const barnStore = useBarn()

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
const boluses = ref<IBolus[]>([])
const bolusesSelected = ref<IBolus[]>([])
const bolusesActions: ITableAction[] = [
  {
    color: 'secondary',
    icon: 'info',
    tooltip: 'Статистика болюса',
    component: dialogComponents['Statistic'],
    title: 'Статистика болюса',
  }
]

const removeBoluses = () => {
  bolusesStore.deleteData(bolusesSelected.value).catch(e => console.log(e))
  bolusesSelected.value = []
}

// dialog
const dialog = ref(false)
const dialogTitle = ref('')
const dialogComponent = shallowRef()

const dialogComponentProps = ref({})

const showDialog = (action: ITableAction, rowProps: {id: number}) => {
  dialogTitle.value = action.title
  dialogComponent.value = action.component
  dialogComponentProps.value = {
    bolusId: rowProps.id
  }
  dialog.value = true
}

// load boluses on barn change
watchEffect(() => {
  if (barnStore.activeBarn) {
    bolusesStore.loadData().catch(e => console.log(e))
  }
})

// load boluses if store change
watchEffect(() => {
  boluses.value = bolusesStore.boluses
})

// onMounted(async () => {
//   try {
//     // load boluses
//     await bolusesStore.loadData()
//     // show boluses
//     boluses.value = bolusesStore.boluses
//   } catch (e) {
//     console.log(e)
//   }
// })

</script>

<style scoped>

</style>

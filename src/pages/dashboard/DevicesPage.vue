<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :columns="headers"
        :rows="devices"
        title="Устройства"
        selection="multiple"
        :selected="devicesSelected"
      >
        <template v-slot:bottom>
          <q-btn
            class="q-ml-sm"
            color="negative"
            :disable="devicesSelected.length < 1"
            label="Удалить"
            icon="delete"
            @click="removeDevices"
          />
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              v-for="action in devicesActions"
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
import Statistic from "components/devices/Statistic.vue";
import {ITableHeader, IDevice, ITableAction} from "src/utils/models";
import {ref, shallowRef, watchEffect} from "vue";
import {useDevices} from "stores/devices";
import {useBarn} from "stores/barns";
import {date} from "quasar";
const {formatDate} = date;


const dialogComponents = {
  Statistic
}
const devicesStore = useDevices()
const barnStore = useBarn()

const headers: ITableHeader[] = [
  {
    name: 'device_id',
    field:'device_id',
    label: 'id',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name: 'sn',
    field:'sn',
    label: 'Серийный номер',
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
    name: 'info',
    field:'info',
    label: 'Информация',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name: 'cow_id',
    field:'cow_id',
    label: 'cow_id',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name: 'cow_name',
    field:'cow_name',
    label: 'Имя животного',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name: 'charge',
    field:'charge',
    label: 'Уровень заряда',
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
  {
    name:'added_at',
    field:'added_at',
    label: 'Дата добавления',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
]
const devices = ref<IDevice[]>([])
const devicesSelected = ref<IDevice[]>([])
const devicesActions: ITableAction[] = [
  {
    color: 'secondary',
    icon: 'info',
    tooltip: 'Статистика болюса',
    component: dialogComponents['Statistic'],
    title: 'Статистика болюса',
  }
]

const removeDevices = () => {
  devicesStore.deleteData(devicesSelected.value).catch(e => console.log(e))
  devicesSelected.value = []
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
    id: rowProps.id
  }
  dialog.value = true
}

// load devices on barn change
watchEffect(() => {
  if (barnStore.activeBarn) {
    devicesStore.loadData().catch(e => console.log(e))
  }
})

// load devices if store change
watchEffect(() => {
  devices.value = devicesStore.devices.map(device => {
    const {added_at, ...rest} = device

    return {
      ...rest,
      added_at: formatDate(added_at, 'DD-MM-YYYY'),
    }
  })
})

// onMounted(async () => {
//   try {
//     // load devices
//     await bolusesStore.loadData()
//     // show devices
//     devices.value = bolusesStore.devices
//   } catch (e) {
//     console.log(e)
//   }
// })

</script>

<style scoped>

</style>

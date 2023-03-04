<template>
  <div class="row q-pa-md q-gutter-md">
    <div class="col">
      <q-table
        :columns="farmsHeaders"
        :rows="farmsRows"
        title="Всего х ферм из х"
        flat
        selection="multiple"
      >
        <template v-slot:bottom>
          <q-btn
            class="q-ml-sm"
            color="negative"
            :disable="farmsSelected.length < 1"
            label="Удалить"
            icon="delete"
            @click="removeFarms"
          />
        </template>
        <template v-slot:body-cell-action="props">
          <q-td :props="props">
            <q-btn
              v-for="action in farmsActions"
              round
              :color="action.color"
              :icon="action.icon"
              flat
              @click="checkFarm(props)"
            >
              <q-tooltip :offset="[10, 10]">{{action.tooltip}}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
    <div class="col">
      <q-table
        :columns="barnsHeaders"
        :rows="barnsRows"
        title="Коровники"
        flat
        selection="multiple"
      >
        <template v-slot:bottom>
          <q-btn
            class="q-ml-sm"
            color="negative"
            :disable="barnSelected.length < 1"
            label="Удалить"
            icon="delete"
            @click="removeBarns"
          />
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import {FetchMethod, IBarn, IFarm, ITableHeader} from "src/utils/models";
import {UseApi} from "boot/api";


// фермы
const farmsHeaders: ITableHeader[] = [
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
    name:'address',
    field:'address',
    label: 'Адрес',
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
    sortable: false
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
const farmsRows = ref<IFarm[]>([])
const farmsSelected = ref<IFarm[]>([])
const farmsActions = [
  {
    icon: 'visibility',
    color: 'info',
    tooltip: 'Показать коровники',
  },
]
const farmChecked = ref<IFarm | null>(null)

const loadFarms = async () => {
  try {
    const farms = await UseApi.farms(null, FetchMethod.GET)

    if (farms) {
      farmsRows.value = farms.map(farm => {
        return {
          ...farm,
          action: null
        }
      })
    }
  } catch (e) {
    console.log(e)
  }
}
const removeFarms = async () => {
  try {
    // delete
    await UseApi.farms(farmsSelected.value, FetchMethod.DELETE)
    // if checked farm in selected reset barns
    verifyCheckedFarmOnRemove()
    farmsSelected.value = []

    // load
    await loadFarms()
  } catch (e) {
    console.log(e)
  }
}

const verifyCheckedFarmOnRemove = () => {
  if (!farmChecked.value) return

  const isCheckedInRemove = farmsSelected.value.includes(farmChecked.value)
  if (isCheckedInRemove) {
    farmChecked.value = null
  }
}

const checkFarm = (rowProps: {row: IFarm}) => {
  farmChecked.value = rowProps.row
}

// коровники
const barnsHeaders: ITableHeader[] = [
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
    name:'added_at',
    field:'added_at',
    label: 'Дата добавления',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
]
const barnsRows = ref<IBarn[]>([])
const barnSelected = ref<IBarn[]>([])

const loadBarns = async () => {
  try {
    if (farmChecked.value) {
      const barns = await UseApi.barns(null, FetchMethod.GET, farmChecked.value)
      barnsRows.value = barns ?? []
    } else {
      barnsRows.value = []
    }
  } catch (e) {
    console.log(e)
  }
}
const removeBarns = async () => {
  try {
    // delete
    await UseApi.barns(barnSelected.value, FetchMethod.DELETE, null)
    barnSelected.value = []

    // load
    await loadBarns()
  } catch (e) {
    console.log(e)
  }
}

// all
onMounted( () => {
  loadFarms().catch(e => console.log(e))
})

watch(farmChecked, () => {
  loadBarns().catch(e => console.log(e))
})

</script>

<style scoped>

</style>

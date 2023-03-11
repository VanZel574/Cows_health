<template>
  <div class="row q-pa-md q-gutter-md">
    <div class="col">
      <q-table
        :columns="farmsHeaders"
        :rows="farmsRows"
        :title="farmsCount"
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
import {IBarn, IFarm, ITableHeader} from "src/utils/models";
import {UseApi} from "boot/api";
import {isFarmList, isBarnList} from "src/utils/guards";
import {date, useQuasar} from "quasar";
const {formatDate} = date;


const $q = useQuasar()
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
const farmsCount = ref('')
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
    const response = await UseApi.get('farm')
    isFarmList(response)

    // set farms
    farmsRows.value = response.farms.map(farm => {
      const {added_at, ...rest} = farm

      return {
        ...rest,
        added_at: formatDate(added_at, 'DD-MM-YYYY'),
        actions: null
      }
    })

    // set count
    farmsCount.value = `Всего ${response.farms.length} из ${response.count.toString()}`
  } catch (e) {
    console.log(e)
  }
}
const removeFarms = async () => {
  try {
    const farmsId: number[] = farmsSelected.value.map(farm => farm.farm_id)
    // delete
    await UseApi.delete('farm', {farm_id: farmsId})
    // if checked farm in selected reset barns
    verifyCheckedFarmOnRemove()

    // notify
    $q.notify({
      type: 'positive',
      message: 'Фермы успешно удалены'
    })

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
    name:'barn_id',
    field:'barn_id',
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
      const response = await UseApi.get('farm/barn/', {farm_id: farmChecked.value.farm_id})
      isBarnList(response)

      // set barns
      barnsRows.value = response[0].barns.barns.map(barn => {
        const {added_at, ...rest} = barn

        return {
          ...rest,
          added_at: formatDate(added_at, 'DD-MM-YYYY')
        }
      })
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
    const barnsId: number[] = barnSelected.value.map(barn => barn.barn_id)
    await UseApi.delete('farm/barn/', {barn_id: barnsId})

    // notify
    $q.notify({
      type: 'positive',
      message: 'Коровники успешно удалены'
    })

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

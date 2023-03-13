<template>
  <div class="row q-pa-md q-gutter-md">
    <div class="col">
      <q-table
        :columns="farmsHeaders"
        :rows="farmsRows"
        :title="farmsCount"
        flat
        selection="multiple"
        row-key="farm_id"
        v-model:selected="farmsSelected"
      >
        <template v-slot:top-right>
          <q-btn
            class="q-ml-sm"
            color="negative"
            :disable="farmsSelected.length < 1"
            label="Удалить"
            icon="delete"
            @click="removeFarms"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              v-for="action in farmsActions"
              round
              :color="action.color"
              :icon="action.icon"
              flat
              size="1em"
              @click="checkFarm(props)"
            >
              <q-tooltip :offset="[10, 10]">{{action.tooltip}}</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <div class="col">
      <barns :farm="farmChecked" v-if="farmChecked" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import Barns from "components/admin/Barns.vue";
import {IFarm, ITableHeader} from "src/utils/models";
import {UseApi} from "boot/api";
import {isFarmList} from "src/utils/guards";
import {date, useQuasar} from "quasar";
const {formatDate} = date;


const $q = useQuasar()
// фермы
const farmsHeaders: ITableHeader[] = [
  {
    name:'farm_id',
    field:'farm_id',
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
        added_at: formatDate(added_at, 'DD.MM.YYYY'),
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

onMounted( () => {
  loadFarms().catch(e => console.log(e))
})

</script>

<style scoped>

</style>

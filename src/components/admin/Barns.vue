<template>
  <q-table
    :columns="barnsHeaders"
    :rows="barnsRows"
    title="Коровники"
    flat
    selection="multiple"
    v-model:selected="barnSelected"
    row-key="barn_id"
  >
    <template v-slot:top-right>
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
</template>

<script setup lang="ts">
// коровники
import {IBarn, IFarm, ITableHeader} from "src/utils/models";
import {ref, watchEffect} from "vue";
import {UseApi} from "boot/api";
import {isBarnList} from "src/utils/guards";
import {date, useQuasar} from "quasar";
const {formatDate} = date;
const $q = useQuasar()


interface Props {
  farm: IFarm | null
}
const props = withDefaults(defineProps<Props>(), {
  farm: () => null,
})

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
    if (props.farm) {
      const response = await UseApi.get('farm/barn/', {farm_id: props.farm.farm_id})
      isBarnList(response)

      // set barns
      barnsRows.value = response[0].barns.barns.map(barn => {
        const {added_at, ...rest} = barn

        return {
          ...rest,
          added_at: formatDate(added_at, 'DD.MM.YYYY')
        }
      })
    } else {
      barnsRows.value = []
    }
  } catch (e) {
    barnsRows.value = []
    console.log(e)
  }
}
const removeBarns = async () => {
  try {
    // delete
    const barnsId: number[] = barnSelected.value.map(barn => barn.barn_id)
    await UseApi.delete('farm/barn', {barn_id: barnsId})

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


watchEffect(() => {
  loadBarns().catch(e => console.log(e))
})

</script>

<style scoped>

</style>

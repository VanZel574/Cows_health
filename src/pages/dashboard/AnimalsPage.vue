<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :columns="headers"
        :rows="animals"
        selection="multiple"
        v-model:selected="animalsSelected"
        row-key="cow_id"
      >
        <template v-slot:top-right>
          <q-btn
            class="q-ml-sm"
            color="negative"
            :disable="animalsSelected.length < 1"
            label="Удалить"
            icon="delete"
            @click="removeAnimals"
          />
        </template>
        <template v-slot:top-left>
          <q-btn
            class="q-ml-sm"
            color="secondary"
            label="Добавить тэг"
            icon="add"
            :disable="animalsSelected.length < 1"
            @click="addAnimalTag"
          />
        </template>

      </q-table>
    </div>
  </q-page>

  <modal :open-dialog="dialog" :title="dialogTitle" @dialog-close="dialog = false">
    <component
      :is="dialogComponent"
      :component-props="dialogComponentProps"
      @dialog-close="dialog = false"
    />
  </modal>
</template>

<script setup lang="ts">
import Modal from "components/Modal.vue";
import Tag from "components/animals/Tag.vue";
import {ITableHeader, IAnimal} from "src/utils/models";
import {markRaw, ref, shallowRef, toRaw, watchEffect} from "vue";
import {useBarn} from "stores/barns";
import {useAnimals} from "stores/animals";
import {date} from "quasar";
const {formatDate} = date;


const dialogComponents = {
  Tag
}

const animalsStore = useAnimals()
const barnStore = useBarn()

const headers: ITableHeader[] = [
  {
    name:'cow_id',
    field:'cow_id',
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
    name:'breed_id',
    field:'breed_id',
    label: 'id породы',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'breed',
    field:'breed',
    label: 'Порода',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'bolus_id',
    field:'bolus_id',
    label: 'id устройства',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'bolus_sn',
    field:'bolus_sn',
    label: 'Серийный номер устройства',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'date_of_born',
    field:'date_of_born',
    label: 'Дата рождения',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'tags',
    field:'tags',
    label: 'Тэги',
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
const animals = ref<IAnimal[]>([])
const animalsSelected = ref<IAnimal[]>([])

const removeAnimals = () => {
  animalsStore.deleteData(animalsSelected.value).catch(e => console.log(e))
  animalsSelected.value = []
}

// dialog
const dialog = ref(false)
const dialogTitle = ref('')
const dialogComponent = shallowRef()
const dialogComponentProps = ref({})

const addAnimalTag = () => {
  dialogTitle.value = 'Тэги'
  dialogComponent.value = dialogComponents['Tag']

  const selectedAnimalsUnref = animalsSelected.value.map(animal => toRaw(animal))
  dialogComponentProps.value = {
    animals: selectedAnimalsUnref
  }
  dialog.value = true
}

// load devices on barn change
watchEffect(() => {
  if (barnStore.activeBarn) {
    animalsStore.loadData().catch(e => console.log(e))
  }
})

// load devices if store change
watchEffect(() => {
  animals.value = animalsStore.animals.map(animal => {
    const {added_at, date_of_born, ...rest} = animal

    return {
      ...rest,
      added_at: formatDate(added_at, 'DD.MM.YYYY'),
      date_of_born: formatDate(date_of_born, 'DD.MM.YYYY'),
    }
  })
})

</script>

<style scoped>

</style>

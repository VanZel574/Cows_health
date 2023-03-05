<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        :columns="headers"
        :rows="animals"
        selection="multiple"
        :selected="animalsSelected"
      >
        <template v-slot:bottom>
          <q-btn
            class="q-ml-sm"
            color="negative"
            :disable="animalsSelected.length < 1"
            label="Удалить"
            icon="delete"
            @click="removeAnimals"
          />
        </template>
        <template v-slot:top>
          <q-btn
            class="q-ml-sm"
            color="secondary"
            label="Добавить тэг"
            icon="add"
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
import {ref, shallowRef, watchEffect} from "vue";
import {useBarn} from "stores/barns";
import {useAnimals} from "stores/animals";


const dialogComponents = {
  Tag
}

const animalsStore = useAnimals()
const barnStore = useBarn()

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
  dialogComponentProps.value = {
    animals: animalsSelected.value
  }
  dialog.value = true
}

// load boluses on barn change
watchEffect(() => {
  if (barnStore.activeBarn) {
    animalsStore.loadData().catch(e => console.log(e))
  }
})

// load boluses if store change
watchEffect(() => {
  animals.value = animalsStore.animals
})

</script>

<style scoped>

</style>

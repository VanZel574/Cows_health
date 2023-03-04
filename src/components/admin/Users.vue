<template>
  <div class="row q-pa-md">
    <div class="col">
      <q-table
        :columns="headers"
        :rows="users"
        :title="tableTitle"
        flat
        selection="multiple"
      >
        <template v-slot:bottom>
          <q-btn
            class="q-ml-sm"
            color="negative"
            :disable="selectedUsers.length < 1"
            label="Удалить"
            icon="delete"
            @click="deleteUsers"
          />
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {FetchMethod, ITableAction, ITableHeader, IUser} from "src/utils/models";
import {UseApi} from "boot/api";


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
    name:'email',
    field:'email',
    label: 'Email',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'permission',
    field:'permission',
    label: 'Permission',
    align: 'left',
    headerStyle: 'font-weight: 600;',
    sortable: true
  },
  {
    name:'status',
    field:'status',
    label: 'Status',
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
const users = ref<IUser[]>([])
const tableTitle = ref('Всего 5 из 10')
const actions: ITableAction[] = []
const selectedUsers = ref<IUser[]>([])

const loadUsers = async () => {
  try {
    const response = await UseApi.users(null, FetchMethod.GET)
    users.value = response ?? []
  } catch (e) {
    throw e
  }
}

onMounted( () => {
  loadUsers().catch(e => console.log(e))
})

const deleteUsers = async() => {
  try {
    await UseApi.users(selectedUsers.value, FetchMethod.DELETE)
    await loadUsers()
  } catch (e) {
    console.log(e)
  }
}

</script>

<style scoped>

</style>

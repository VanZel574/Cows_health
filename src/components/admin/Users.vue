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
import {ITableAction, ITableHeader, IUser} from "src/utils/models";
import {UseApi} from "boot/api";
import {isUserList} from "src/utils/guards";
import {date} from "quasar";
const {formatDate} = date;
import {useQuasar} from "quasar";


const $q = useQuasar()

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
    name:'login',
    field:'login',
    label: 'Login',
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
const tableTitle = ref('')
const actions: ITableAction[] = []
const selectedUsers = ref<IUser[]>([])

const loadUsers = async () => {
  try {
    const response = await UseApi.get('user/list')
    isUserList(response)

    users.value = response.users.map(user => {
      const {added_at, ...rest} = user
      return {
        added_at: formatDate(added_at, 'DD-MM-YYYY'),
        ...rest
      }
    })
    tableTitle.value = `Всего ${response.users.length} из ${response.count.toString()}`
  } catch (e) {
    throw e
  }
}

onMounted( () => {
  loadUsers().catch(e => console.log(e))
})

const deleteUsers = async() => {
  try {
    const userIdList: number[] = selectedUsers.value.map(user => user.id)
    await UseApi.delete('user', {userIdList})

    selectedUsers.value = []

    $q.notify({
      type: 'positive',
      message: 'Пользователи успешно удалены'
    })

    await loadUsers()
  } catch (e) {
    console.log(e)
  }
}

</script>

<style scoped>

</style>

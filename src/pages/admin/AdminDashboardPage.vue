<template>
  <q-page>
    <div class="q-pa-md">
      <q-toolbar class="bg-primary text-white shadow-2 rounded-borders">
        <div class="text-h6">Панель управления</div>
        <q-space />
        <q-btn stretch flat label="Терминал" icon="home" to="/" />
      </q-toolbar>
    </div>

    <div class="q-pa-md">
      <keys />
    </div>

    <div class="row q-pa-md">
      <div class="col">
        <q-card>
          <q-tabs
            v-model="tab"
            dense
            active-color="primary"
            indicator-color="primary"
            align="justify"
            inline-label
          >
            <q-tab name="users" label="Пользователи" icon="people" />
            <q-tab name="farms" label="Фермы" icon="foundation" />

          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="users">
              <Users />
            </q-tab-panel>

            <q-tab-panel name="farms">
              <Farms />
            </q-tab-panel>
          </q-tab-panels>

        </q-card>
      </div>
    </div>
  </q-page>
</template>


<script setup lang="ts">
import { ref } from "vue";
import Users from "components/admin/Users.vue";
import Farms from "components/admin/Farms.vue";
import Keys from "components/admin/Keys.vue";


const tab = ref('users')


</script>

<style scoped>

</style>

<template>
  <q-header elevated height-hint="98">
    <!--    Header-->
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" alt="logo">
        </q-avatar>
        Здоровье коров
      </q-toolbar-title>

      <q-space />

      <q-btn stretch flat label="служба поддержки" />

      <q-btn-dropdown stretch flat label="Язык">
        <q-list>
          <q-item clickable>
            <q-item-section>
              <q-item-label>Русский</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable>
            <q-item-section>
              <q-item-label>English</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <q-btn-dropdown stretch flat label="аккаунт">
        <q-list>
          <q-item to="/user/confirm" exact>
            <q-item-section>
              <q-item-label>Личный кабинет</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label v-if="!loadingLogout">Выйти</q-item-label>
              <q-spinner color="primary" :thickness="2" v-else />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

    </q-toolbar>

<!--    Menu-->
    <div class="row items-start q-col-gutter-x-sm q-pa-md">
      <div class="col col-auto">
<!--      Фермы-->
        <q-select
          :options="farmStore.farmList"
          label="Выберите ферму"
          v-model="initFarmModel"
          outlined
          style="min-width: 250px; max-width: 300px"
          bg-color="blue-1"
          @update:model-value="farmChange"
          option-value="farm_id"
          option-label="name"
        >
          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="add"
              @click="showDialog({title: 'Новая ферма', component: newComponents['NewFarm']})"
            />
          </template>
        </q-select>
      </div>

      <div class="col col-auto">
<!--      Коровники-->
        <q-select
          :options="barnStore.barnList"
          label="Выберите коровник"
          v-model="initBarnModel"
          outlined
          style="min-width: 250px; max-width: 300px"
          bg-color="blue-1"
          @update:model-value="barnChange"
          option-value="barn_id"
          option-label="name"
        >
          <template v-slot:append>
            <q-btn
              round
              dense
              flat
              icon="add"
              @click="showDialog({title: 'Новый коровник', component: newComponents['NewBarn']})"
            />
          </template>
        </q-select>
      </div>

      <div class="col">
        <q-tabs align="left">
<!--        Приборы-->
          <q-route-tab to="/" label="панель приборов" />

<!--        Сообщения-->
          <q-route-tab to="/messages" label="сообщения">
            <q-badge color="green" floating>4</q-badge>
          </q-route-tab>

 <!--        Животные-->
          <q-btn-group outline>
            <q-route-tab to="/animals" label="животные"></q-route-tab>
            <q-btn
              class="primary"
              round
              color="primary"
              icon="add"
              @click="showDialog({title: 'Новое животное', component: newComponents['NewAnimal']})"
            />
          </q-btn-group>

<!--        Группы-->
          <q-btn-group outline>
            <q-route-tab to="/groups" label="группы" />
            <q-btn
              class="primary"
              round
              color="primary"
              icon="add"
              @click="showDialog({title: 'Новая группа', component: newComponents['NewGroup']})"
            />
          </q-btn-group>

<!--        Болюсы-->
          <q-btn-group outline>
            <q-route-tab to="/devices" label="болюсы" />
            <q-btn
              class="primary"
              round
              color="primary"
              icon="add"
              @click="showDialog({title: 'Новый болюс', component: newComponents['NewBolus']})"
            />
          </q-btn-group>

        </q-tabs>
      </div>
    </div>
  </q-header>

  <modal :open-dialog="dialog" :title="dialogTitle" @dialog-close="dialog = false">
    <component :is="dialogComponent"></component>
  </modal>

</template>

<script setup lang="ts">
import Modal from "components/Modal.vue";
import NewFarm from "components/layout/NewFarm.vue";
import NewAnimal from "components/layout/NewAnimal.vue";
import NewGroup from "components/layout/NewGroup.vue";
import NewBolus from "components/layout/NewBolus.vue";
import NewBarn from "components//layout/NewBarn.vue";
import {useFarm} from "stores/farms";
import {useBarn} from "stores/barns";
import {ref, shallowRef} from "vue";
import {IFarm, IBarn} from "src/utils/models";


const newComponents = {
  NewFarm, NewAnimal, NewBolus, NewGroup, NewBarn
}

// Фермы
const farmStore = useFarm()
const initFarmModel = ref<IFarm | null>(null)
const farmChange = (farm: IFarm) => {
  farmStore.activeFarm = farm
}

// Коровники
const barnStore = useBarn()
const initBarnModel = ref<IBarn | null>(null)
const barnChange = (barn: IBarn) => {
  barnStore.activeBarn = barn
}

const loadingLogout = ref(false)


// dialog
const dialog = ref(false)
const dialogTitle = ref('')
const dialogComponent = shallowRef()
// const dialogComponentProps = ref(null)

const showDialog = ({title, component }: {title: string, component: object}) => {
  dialogTitle.value = title
  dialog.value = true
  dialogComponent.value = component
}


</script>

<style scoped>

</style>

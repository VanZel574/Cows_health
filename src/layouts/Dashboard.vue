<template>
  <q-layout view="hHh lpR fFf">

    <TheHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <TheFooter />

  </q-layout>
</template>

<script lang="ts">
import {useAuth} from "stores/auth";
import {preFetch} from 'quasar/wrappers';


export default {
  preFetch: preFetch(({ redirect }) => {
      const authStore = useAuth()
      if (!authStore.isAuth) {
        redirect({
          path: '/auth/login'
        })
      }
  }),
}
</script>

<script setup lang="ts">
import TheHeader from 'components/layout/TheHeader.vue';
import TheFooter from 'components/layout/TheFooter.vue';
import {onMounted, watch} from "vue";
import {useFarm} from "stores/farms";
import {useBarn} from "stores/barns";
import {storeToRefs} from "pinia";


const farmStore = useFarm()
const {activeFarm} = storeToRefs(farmStore)
const barnStore = useBarn()


onMounted(async () => {
  try {
    // load farm list
    await farmStore.loadData()
    // check active farm in local storage
    farmStore.checkActiveFarmInFarmList()
    // load barn list
    await barnStore.loadData()
    // check active barn in local storage
    barnStore.checkActiveBarnInBarnList()
  } catch (e) {
    console.log(e)
  }
})

watch(activeFarm, () => {
  barnStore.loadData().catch(e => console.log(e))
})

</script>

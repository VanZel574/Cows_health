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
import { useAuth } from "stores/auth";
import { preFetch } from 'quasar/wrappers';


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

</script>

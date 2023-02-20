<template>
  <q-dialog :model-value="openDialog" persistent :maximized="maximizedToggle" transition-show="slide-up" transition-hide="slide-down">
    <q-card :class="{'bg-primary text-white': dark}">
      <q-bar>
        <q-space />

        <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
          <q-tooltip v-if="maximizedToggle" class="bg-white text-primary">Свернуть</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
          <q-tooltip v-if="!maximizedToggle" class="bg-white text-primary">Развернуть</q-tooltip>
        </q-btn>
        <q-btn dense flat icon="close" v-close-popup @click="dialogClose">
          <q-tooltip class="bg-white text-primary">Закрыть</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <div class="text-h6">{{title}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';


const props = defineProps({
  openDialog: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Заголовок'
  },
  maximized: {
    type: Boolean,
    default: false
  },
  dark: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['dialogClose'])

const dialogClose = () => {
  emit('dialogClose')
}

const maximizedToggle = ref(props.maximized)
</script>

<style scoped>

</style>

<template>
  <q-card class="my-card" style="width: 500px">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Выберите существующий тэг</div>
      <div class="text-subtitle2">или добавьте новый</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-input outlined v-model="newTag" label="Введите новый тэг" />
      <q-scroll-area class="q-mt-lg" style="height: 200px">
        <div class="q-gutter-sm">
          <q-chip v-for="tag in tagList" :key="tag.name" size="md" v-model:selected="tag.selected">{{tag.name}}</q-chip>
        </div>
      </q-scroll-area>
    </q-card-section>

    <q-card-actions>
      <q-btn flat @click="emit('dialogClose')">Отменить</q-btn>
      <q-btn flat color="primary" @click="addTag">Добавить тэги</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {IAnimal} from "src/utils/models";


interface IProps {
  componentProps: IAnimal[]
}

const props = withDefaults(defineProps<IProps>(), {
  componentProps: () => [],
})
const emit = defineEmits(['dialogClose'])

const newTag = ref('')
const tagList = ref([
  {
    name: 'tag1',
    selected: false
  },
  {
    name: 'tag2',
    selected: false
  },
])

const addTag = () => {
  // close dialog
  emit('dialogClose')
}


</script>

<style scoped>

</style>

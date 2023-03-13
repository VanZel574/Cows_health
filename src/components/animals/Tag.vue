<template>
  <q-card class="my-card" style="width: 500px">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6">Выберите существующий тэг</div>
      <div class="text-subtitle2">или добавьте новый</div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-input outlined v-model.trim="newTag" label="Введите новый тэг" />
      <q-scroll-area class="q-mt-lg" style="height: 200px">
        <div class="q-gutter-sm">
          <q-chip v-for="tag in tagList" :key="tag.tag_id" size="md" v-model:selected="tag.selected">{{tag.value}}</q-chip>
        </div>
      </q-scroll-area>
    </q-card-section>

    <q-card-actions>
      <q-btn flat color="primary" @click="addTag">Добавить тэги</q-btn>
      <q-btn flat @click="emit('dialogClose')">Отменить</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import {ref, onMounted} from "vue";
import {IAnimal, ITag} from "src/utils/models";
import {UseApi} from "boot/api";
import {isTag} from "src/utils/guards";
import {useAnimals} from "stores/animals";


interface IProps {
  componentProps: {
    animals: IAnimal[]
  }
}
const props = withDefaults(defineProps<IProps>(), {
  componentProps: () => ({animals: []}),
})

const emit = defineEmits(['dialogClose'])

const animalStore = useAnimals()

const newTag = ref('')
const tagList = ref<ITag[]>([])
const loading = ref(false)

onMounted(async () => {
  try {
    const response = await UseApi.get('cow/tags')
    isTag(response)

    tagList.value = response.map(tag => ({...tag, selected: false}))

  } catch (e) {
    console.log(e)
  }
})

const addTag = async () => {
  try {
    loading.value = true
    // build selected and new tags
    const selectedTags: ITag[] = tagList.value.filter(tag => tag.selected)
    let selectedTagsValue: string[] = selectedTags.map(tag => tag.value)
    if (newTag.value !== '') selectedTagsValue.push(newTag.value)

    // filter cows_id
    const cowId: number[] = props.componentProps.animals.map(cow => cow.cow_id)
    console.log(selectedTagsValue, cowId)

    await UseApi.post('cow/tags', {tag: selectedTagsValue, cow_id: cowId})
    await animalStore.loadData()

    loading.value = false
    // close dialog
    emit('dialogClose')
  } catch (e) {
    loading.value = false
    console.log(e)
  }
}


</script>

<style scoped>

</style>

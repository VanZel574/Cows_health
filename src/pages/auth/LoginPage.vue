<template>
  <q-page class="flex justify-center items-center q-pa-md">
    <q-card style="width: 100%; max-width: 400px">
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input
            v-model="name"
            filled
            label="Ваше имя"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Введите имя']"
          />
          <q-input
            v-model="password"
            filled
            label="Пароль"
            lazy-rules
            :rules="[val => !!val || 'Поле обязательно']"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div>
            <q-btn label="Войти" type="submit" color="primary" :loading="loading" />
            <q-btn label="Регистрация" color="primary" flat class="q-ml-sm" to="/auth/register" v-if="!admin" />
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "stores/auth";


const props = defineProps({
  routerLink: {
    type: String,
    default: '/'
  },
  admin: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()
const authStore = useAuth()

const isPwd = ref(true)
const name = ref('')
const password = ref('')

const loading = ref(false)



// login
const onSubmit = async () => {
  try {
    loading.value = true
    await authStore.login({
      login: name.value,
      password: password.value
    })
    loading.value = false

    await router.push({path: props.routerLink})

    // switch (response.status) {
    //   case 200:
    //     router.push({path: props.routerLink})
    //     break
    //   case 400:
    //     showError.value = true
    //     errorText.value = 'неверный формат запроса'
    //     break
    //   case 401:
    //     showError.value = true
    //     errorText.value = 'неверная пара логин/пароль'
    //     break
    //   case 500:
    //     showError.value = true
    //     errorText.value = 'внутренняя ошибка сервера'
    //     break
    //   default:
    //     showError.value = true
    //     errorText.value = 'ошибка'
    // }
  } catch (e) {
    loading.value = false
  }
}

</script>

<style scoped>

</style>


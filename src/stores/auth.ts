import { defineStore } from 'pinia';
import { useFarm } from './farms';
import { useAnimals } from "./animals";
import { useDevices } from "./devices";
import { LocalStorage, Cookies } from "quasar";
import { IUser, IUserStore } from "src/utils/models";
import { UseApi } from "boot/api";


export const useAuth = defineStore('auth', {
  state: (): IUserStore => {
    return {
      isAuth: true,
      token: null,
      userId: null,
      role: ''
    }
  },

  actions: {
    authAction () {
      this.checkAuth()
      LocalStorage.set('auth',this.$state)
    },
    /*-----------------------
    * login user
    *----------------------*/
    async login(user: IUser) {
      try {
        await UseApi.post('user/login/', {login: user.login, password: user.password})

        this.authAction()
      } catch (e) {
        throw e
      }
    },

    /*--------------------
    * register user
    *-------------------*/
    async register(user: IUser) {
      try {
        const {login, password, key, email, permission} = user
        await UseApi.post('user/register/', {login, password, key, email, permission})

        this.authAction()

      } catch (e) {
        throw e
      }
    },

    /*----------------------
    * logout user
    *----------------------*/
    async logout () {
      try {
        await UseApi.post('user/logout/', {})

        // reset state
        this.$reset()

        const farmStore = useFarm()
        const animalStore = useAnimals()
        const bolusesStore = useDevices()
        farmStore.$reset()
        animalStore.$reset()
        bolusesStore.$reset()

        // set to local storage
        LocalStorage.set('auth',this.$state)
        // clear cookie
        Cookies.remove('cows_health')
      } catch (e) {
        throw e
      }
    },

    /*-------------------------
    * check user auth
    *------------------------*/
    checkAuth () {
      // get token
      const token = Cookies.get('cows_health')
      this.token = token
      this.isAuth = Boolean(token)
      this.role = 'admin'
    },
  }
})

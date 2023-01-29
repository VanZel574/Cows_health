import { defineStore } from 'pinia';


export const useAuth = defineStore('auth', {
  state: () => {
    return {
      isAuth: true,
    }
  }
})

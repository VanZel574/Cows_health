import { defineStore } from 'pinia';
import { UseApi } from "boot/api";
import { useFarm } from './farms'
import { FetchMethod, IBarn, IBarnStore } from "src/utils/models";
import { LocalStorage } from "quasar";
import {Notify} from "quasar";


export const useBarn = defineStore('barn', {
  state: (): IBarnStore => {
    return {
      barnList: [],
      activeBarn: null
    }
  },
  actions: {
    /*-----------------
    * load barn list
    *-----------------*/
    async loadData () {
      try {
        const farm = useFarm()
        const {activeFarm} = farm
        if (!activeFarm) return

        const response = await UseApi.barns(null, FetchMethod.GET, activeFarm)
        if (response) {
          this.barnList = response
        }
      } catch (e) {
        throw e
      }
    },

    /*-----------------
    * set barn to store
    *-----------------*/
    setActiveBarn (barn: IBarn) {
      this.activeBarn = barn
      LocalStorage.set('barn', barn)
    },

    /*------------------------------------
    * check localstorage barn in barn list
    *-----------------------------------*/
    checkActiveBarnInBarnList () {
      const activeBarn: IBarn | null = LocalStorage.getItem('barn')
      if (!activeBarn) return

      const {id} = activeBarn
      const barnExist = this.barnList.find(item => item.id === id)
      if (barnExist) {
        this.activeBarn = activeBarn
      } else {
        this.activeBarn = null
        LocalStorage.remove('barn')
      }
    },

    /*---------------
    * add new barn
    *---------------*/
    async addData (newBarn: IBarn) {
      try {
        // add
        const farm = useFarm()
        const {activeFarm} = farm

        if (!activeFarm) {
          Notify.create({
            type: 'negative',
            message: 'Ошибка! не выбрана ферма'
          })
          return
        }

        await UseApi.barns(newBarn, FetchMethod.POST, activeFarm)

        // get barn list
        await this.loadData()
      } catch (e) {
        throw e
      }
    },

    async deleteData () {}
  }
})

import { defineStore } from 'pinia';
import { UseApi } from "boot/api";
import {  FetchMethod, IFarm, IFarmStore } from "src/utils/models";
import { LocalStorage } from "quasar";


export const useFarm = defineStore('farm', {
  state: (): IFarmStore => {
    return {
      farmList: [],
      activeFarm: null
    }
  },
  actions: {
    /*-----------------
    * load farms list
    *-----------------*/
    async loadData () {
      try {
        const response = await UseApi.farms(null, FetchMethod.GET)
        if (response) {
          this.farmList = response
        }
      } catch (e) {
        throw e
      }
    },

    /*-----------------
    * set farm to store
    *-----------------*/
    setActiveFarm (farm: IFarm) {
      this.activeFarm = farm
      LocalStorage.set('farm', farm)
    },

    /*------------------------------------
    * check localstorage farm in farm list
    *-----------------------------------*/
    checkFarm () {
      const activeFarm: IFarm | null = LocalStorage.getItem('farm')
      if (!activeFarm) return

      const {id} = activeFarm
      const farmExist = this.farmList.find(item => item.id === id)
      if (farmExist) {
        this.activeFarm = activeFarm
      } else {
        this.activeFarm = null
        LocalStorage.remove('farm')
      }
    },

    /*---------------
    * add new farm
    *---------------*/
    async addData (newFarm: IFarm) {
      try {
        // add
        await UseApi.farms(newFarm, FetchMethod.POST)

        // get farm list
        await this.loadData()
      } catch (e) {
        throw e
      }
    },

    async deleteData () {}
  }
})

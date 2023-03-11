import {defineStore} from 'pinia';
import {UseApi} from "boot/api";
import {IFarm, IFarmStore} from "src/utils/models";
import {LocalStorage} from "quasar";
import {isFarmList} from "src/utils/guards";


export const useFarm = defineStore('farm', {
  state: (): IFarmStore => {
    return {
      farmList: [],
      activeFarm: null,
      count: 0
    }
  },
  actions: {
    /*-----------------
    * load farms list
    *-----------------*/
    async loadData () {
      try {
        const response = await UseApi.get('farm')
        isFarmList(response)

        this.farmList = response.farms
        this.count = response.count
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
    checkActiveFarmInFarmList () {
      const activeFarm: IFarm | null = LocalStorage.getItem('farm')
      if (!activeFarm) return

      const {farm_id} = activeFarm
      const farmExist = this.farmList.find(item => item.farm_id === farm_id)
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
        await UseApi.post('farm', newFarm)

        // get farm list
        await this.loadData()
      } catch (e) {
        throw e
      }
    },

    async deleteData () {}
  }
})

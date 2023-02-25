import { defineStore } from 'pinia'
import { useFarm } from "./farms";
import { FetchMethod, IBolus, IBolusesStore } from "src/utils/models";
import { UseApi } from "boot/api";


export const useBoluses = defineStore('boluses', {
  state: (): IBolusesStore => {
    return {
      boluses: [],
    }
  },

  actions: {
    /*-------------------
    * load boluses list
    *------------------*/
    async loadData() {
      try {
        // farm store
        const farm = useFarm()
        const {activeFarm} = farm

        if (activeFarm) {
          const response = await UseApi.boluses(null, FetchMethod.GET, activeFarm)
          this.boluses = response ?? this.boluses
        }
      } catch (e) {
        throw e
      }
    },

    /*-----------------
    * add new bolus
    *-----------------*/
    async addData(newBolus: IBolus) {
      try {

        // farm store
        const farm = useFarm()
        const {activeFarm} = farm

        if (activeFarm) {
          // add
          await UseApi.boluses(newBolus, FetchMethod.POST, activeFarm)
          // load bolus list
          await this.loadData()
          /*
          // load animal list
          const animalStore = useAnimals()
          await animalStore.loadData()
           */
        }

      } catch (e) {
        throw e
      }
    },

    /*------------------
    * delete bolus
    *--------------------*/
    async deleteData(bolus: IBolus[]) {
      try {
        // farm store
        const farm = useFarm()
        const {activeFarm} = farm

        if (activeFarm) {
          // delete
          await UseApi.boluses(bolus, FetchMethod.DELETE, activeFarm)
          // load bolus list
          await this.loadData()
        }
      } catch (e) {
        throw e
      }
    }
  }
})

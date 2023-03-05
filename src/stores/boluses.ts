import {defineStore} from 'pinia'
import {useFarm} from "./farms";
import {useBarn} from "stores/barns";
import {FetchMethod, IBolus, IBolusesStore} from "src/utils/models";
import {UseApi} from "boot/api";


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
        const barn = useBarn()
        const {activeBarn} = barn

        if (activeFarm && activeBarn) {
          const response = await UseApi.boluses(null, FetchMethod.GET, activeFarm, activeBarn)
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
        // barn store
        const barn = useBarn()
        const {activeBarn} = barn

        if (activeFarm && activeBarn) {
          // add
          await UseApi.boluses(newBolus, FetchMethod.POST, activeFarm, activeBarn)
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
        const barn = useBarn()
        const {activeBarn} = barn

        if (activeFarm && activeBarn) {
          // delete
          await UseApi.boluses(bolus, FetchMethod.DELETE, activeFarm, activeBarn)
          // load bolus list
          await this.loadData()
        }
      } catch (e) {
        throw e
      }
    }
  }
})

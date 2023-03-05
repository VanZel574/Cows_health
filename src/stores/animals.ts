import {defineStore} from 'pinia';
import {UseApi} from "boot/api";
import {useFarm} from './farms';
import {useBarn} from "stores/barns";
import {FetchMethod, IAnimal, IAnimalStore} from "src/utils/models";


export const useAnimals = defineStore('animals', {
  state: (): IAnimalStore => {
    return {
      animals: [],
    }
  },

  actions: {
    /*--------------------------
    * load animal list
    *-------------------------*/
    async loadData() {
      try {
        const farm = useFarm()
        const {activeFarm} = farm
        const barn = useBarn()
        const {activeBarn} = barn

        if (activeFarm && activeBarn) {
          const response = await UseApi.animals(null, FetchMethod.GET, activeFarm, activeBarn)
          this.animals = response ?? this.animals
        }
      } catch (e) {
        throw e
      }
    },

    /*------------------------
    * add new animal
    *-----------------------*/
    async addData(newAnimal: IAnimal) {
      try {
        // farm store
        const farm = useFarm()
        const {activeFarm} = farm
        const barn = useBarn()
        const {activeBarn} = barn

        if(activeFarm && activeBarn) {
          // add animal
          await UseApi.animals(newAnimal, FetchMethod.POST, activeFarm, activeBarn)
          // load cow list
          await this.loadData()
        }

      } catch (e) {
        throw e
      }
    },

    // /*----------------------
    // * get animal info
    // *---------------------*/
    // async getInfo ({id}) {
    //   try {
    //     this.animalInfo = await this.api.getAnimalInfo(id)
    //   }catch (e) {
    //     throw new Error(e)
    //   }
    // },

    /*-------------------
    * delete animal
    *------------------*/
    async deleteData(animal: IAnimal[]) {
      try {
        // farm store
        const farm = useFarm()
        const {activeFarm} = farm
        const barn = useBarn()
        const {activeBarn} = barn

        if (activeFarm && activeBarn) {
          // delete
          await UseApi.animals(animal, FetchMethod.DELETE, activeFarm, activeBarn)
          // load cow list
          await this.loadData()
        }
      } catch (e) {
        throw e
      }
    }
  }
})

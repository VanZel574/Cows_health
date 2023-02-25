import { defineStore } from 'pinia';
import { UseApi } from "boot/api";
import { useFarm } from './farms'
import { FetchMethod, IAnimal, IAnimalStore } from "src/utils/models";


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

        if (activeFarm) {
          const response = await UseApi.animals(null, FetchMethod.GET, activeFarm)
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

        if(activeFarm) {
          // add animal
          await UseApi.animals(newAnimal, FetchMethod.POST, activeFarm)
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

        if (activeFarm) {
          // delete
          await UseApi.animals(animal, FetchMethod.DELETE, activeFarm)
          // load cow list
          await this.loadData()
        }
      } catch (e) {
        throw e
      }
    }
  }
})

import {defineStore} from 'pinia';
import {UseApi} from "boot/api";
// import {useFarm} from './farms';
import {useBarn} from "stores/barns";
import {IAnimal, IAnimalStore} from "src/utils/models";
import {isAnimalList} from "src/utils/guards";


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
        // const farm = useFarm()
        // const {activeFarm} = farm
        const barn = useBarn()
        const {activeBarn} = barn

        if (activeBarn) {
          const response = await UseApi.get('cow', {barn_id: activeBarn.barn_id})
          isAnimalList(response)

          this.animals = response[0].cows
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
        // const farm = useFarm()
        // const {activeFarm} = farm
        const barn = useBarn()
        const {activeBarn} = barn

        if(activeBarn) {
          // add animal
          await UseApi.post('cow', {cow_id: newAnimal.cow_id}, {barn_id: activeBarn.barn_id})
          this.Notify.create({
            type: 'positive',
            message: 'Животные успешно добавлены'
          })
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
    async deleteData(animals: IAnimal[]) {
      try {
        // farm store
        // const farm = useFarm()
        // const {activeFarm} = farm
        const barn = useBarn()
        const {activeBarn} = barn

        if (activeBarn) {
          const animalIdList: number[] = animals.map(animal => animal.cow_id)
          // delete
          await UseApi.delete('cow', {cow_id: animalIdList})
          // notify
          this.Notify.create({
            type: 'positive',
            message: 'Животные успешно удалены'
          })
          // load cow list
          await this.loadData()
        }
      } catch (e) {
        throw e
      }
    }
  }
})

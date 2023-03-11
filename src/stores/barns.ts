import {defineStore} from 'pinia';
import {UseApi} from "boot/api";
import {useFarm} from './farms'
import {IBarn, IBarnStore} from "src/utils/models";
import {isBarnList} from "src/utils/guards";
import {LocalStorage} from "quasar";


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
    async loadData() {
      try {
        const farm = useFarm()
        const {activeFarm} = farm
        if (!activeFarm) return

        const response = await UseApi.get('farm/barn', {farm_id: activeFarm.farm_id})
        isBarnList(response)

        this.barnList = response[0].barns.barns
      } catch (e) {
        throw e
      }
    },

    /*-----------------
    * set barn to store
    *-----------------*/
    setActiveBarn(barn: IBarn) {
      this.activeBarn = barn
      LocalStorage.set('barn', barn)
    },

    /*------------------------------------
    * check localstorage barn in barn list
    *-----------------------------------*/
    checkActiveBarnInBarnList() {
      const activeBarn: IBarn | null = LocalStorage.getItem('barn')
      if (!activeBarn) return

      const {barn_id} = activeBarn
      const barnExist = this.barnList.find(item => item.barn_id === barn_id)
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
    async addData(newBarn: IBarn) {
      try {
        // add
        const farm = useFarm()
        const {activeFarm} = farm

        if (!activeFarm) {
          this.Notify.create({
            type: 'negative',
            message: 'Ошибка! не выбрана ферма'
          })
          return
        }

        await UseApi.post('farm/barn', {barn_id: newBarn.barn_id}, {farm_id: activeFarm.farm_id})
        this.Notify.create({
          type: 'positive',
          message: 'Коровник успешно добавлены'
        })

        // get barn list
        await this.loadData()
      } catch (e) {
        throw e
      }
    },

    async deleteData () {}
  }
})

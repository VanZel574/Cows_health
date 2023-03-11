import {defineStore} from 'pinia'
// import {useFarm} from "./farms";
// import {useBarn} from "stores/barns";
import {IDevice, IDevicesStore} from "src/utils/models";
import {UseApi} from "boot/api";
import {isDevice} from "src/utils/guards";


export const useDevices = defineStore('devices', {
  state: (): IDevicesStore => {
    return {
      devices: [],
    }
  },

  actions: {
    /*-------------------
    * load devices list
    *------------------*/
    async loadData() {
      try {
        // farm store
        // const farm = useFarm()
        // const {activeFarm} = farm
        // const barn = useBarn()
        // const {activeBarn} = barn
        const response = await UseApi.get('device', {list: 0})
        isDevice(response)
        this.devices = response
      } catch (e) {
        throw e
      }
    },

    /*-----------------
    * add new bolus
    *-----------------*/
    async addData(newDevice: IDevice) {
      try {

        // farm store
        // const farm = useFarm()
        // const {activeFarm} = farm
        // barn store
        // const barn = useBarn()
        // const {activeBarn} = barn

        // add
        await UseApi.post('device', {device: newDevice})
        this.Notify.create({
          type: 'positive',
          message: 'Устройства успешно добавлены'
        })
        // load bolus list
        await this.loadData()
        /*
        // load animal list
        const animalStore = useAnimals()
        await animalStore.loadData()
         */

      } catch (e) {
        throw e
      }
    },

    /*------------------
    * delete bolus
    *--------------------*/
    async deleteData(devices: IDevice[]) {
      try {
        // farm store
        // const farm = useFarm()
        // const {activeFarm} = farm
        // const barn = useBarn()
        // const {activeBarn} = barn
        const deviceIdList: number[] = devices.map((device) => device.device_id)
        // delete
        await UseApi.delete('device', {device_id: deviceIdList})
        this.Notify.create({
          type: 'positive',
          message: 'Устройства успешно удалены'
        })
        // load bolus list
        await this.loadData()
      } catch (e) {
        throw e
      }
    }
  }
})

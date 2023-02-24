import ky from 'ky';
import { Notify } from 'quasar';
import {FetchMethod, IAnimal, IBolus, IFarm} from "src/utils/models";
import { isFarm, isBolus, isAnimal } from "src/utils/guards";



interface IFetch {
  endpoint: string;
  method: FetchMethod;
  data: Record<string, any> | null;
  params: Record<string, any> | undefined;
}

const kyInstance = ky.create({
  prefixUrl: '/api',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  hooks: {
    beforeError: [
      error => {
        const {response} = error
        if (response && response.body) {
          Notify.create({
            type: 'negative',
            message: 'error'
          })
        }

        return error
      }
    ]
  }
})


export class UseApi {
  /*-----------------------------------------
  * Fetch data
  *----------------------------------------*/
  private static async _fetchData(fetchProps: IFetch): Promise<unknown> {
    try {
      return await kyInstance(fetchProps.endpoint, {
        method: fetchProps.method,
        searchParams: fetchProps.params,
        json: fetchProps.data
      }).json()
    } catch (e) {
      throw e
    }
  }

  /*--------------------------------
  * Farms api
  *-------------------------------*/
  static farms = async (newFarm: IFarm | null, method: FetchMethod): Promise<IFarm[] | undefined> => {
    try {
      const fetchParams: IFetch = {
        endpoint: `/farm`,
        method: method,
        data: newFarm,
        params: undefined
      }
      const response = await this._fetchData(fetchParams)

      switch (method) {
        case FetchMethod.GET:
          // guard
          isFarm(response)
          return response
        case FetchMethod.POST:
          Notify.create({
            type: 'positive',
            message: 'Ферма добавлена'
          })
          break
        case FetchMethod.DELETE:
          Notify.create({
            type: 'warning',
            message: 'Ферма удалена'
          })
          break
      }
    } catch (e) {
      throw e
    }
  }

  /*--------------------------------
  * Boluses api
  *-------------------------------*/
  static boluses = async (newBolus: IFarm | null, method: FetchMethod): Promise<IBolus[] | undefined> => {
    try {
      const fetchParams: IFetch = {
        endpoint: `/bolus`,
        method: method,
        data: newBolus,
        params: undefined
      }
      const response = await this._fetchData(fetchParams)

      switch (method) {
        case FetchMethod.GET:
          // guard
          isBolus(response)
          return response
        case FetchMethod.POST:
          Notify.create({
            type: 'positive',
            message: 'Болюс добавлен'
          })
          break
        case FetchMethod.DELETE:
          Notify.create({
            type: 'warning',
            message: 'Болюс удален'
          })
          break
      }
    } catch (e) {
      throw e
    }
  }

  /*--------------------------------
  * Animals api
  *-------------------------------*/
  static animals = async (newAnimal: IFarm | null, method: FetchMethod): Promise<IAnimal[] | undefined> => {
    try {
      const fetchParams: IFetch = {
        endpoint: `/bolus`,
        method: method,
        data: newAnimal,
        params: undefined
      }
      const response = await this._fetchData(fetchParams)

      switch (method) {
        case FetchMethod.GET:
          // guard
          isAnimal(response)
          return response
        case FetchMethod.POST:
          Notify.create({
            type: 'positive',
            message: 'Ферма добавлена'
          })
          break
        case FetchMethod.DELETE:
          Notify.create({
            type: 'warning',
            message: 'Животное удалено'
          })
          break
      }
    } catch (e) {
      throw e
    }
  }

}

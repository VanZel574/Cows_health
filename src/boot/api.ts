import ky from 'ky';
import {Notify} from 'quasar';
import {FetchMethod, IAnimal, IBarn, IBolus, IFarm, IUser} from "src/utils/models";
import {isAnimal, isBarn, isBolus, isFarm, isUser} from "src/utils/guards";


interface IFetch {
  endpoint: string;
  method: FetchMethod;
  data: Record<string, any> | null | undefined;
  params: Record<string, any> | undefined;
}

const kyInstance = ky.create({
  prefixUrl: '/api/',
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
            message: 'Ошибка!'
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

  /*--------------------------------------------
  * Auth
  *-------------------------------------------*/
  static login = async (user: IUser) => {
    try {
      const fetchParams: IFetch = {
        endpoint: `user/login`,
        method: FetchMethod.POST,
        data: user,
        params: undefined
      }
      await this._fetchData(fetchParams)
    } catch (e) {
      // TODO Добавить оповещение об ошибке по номеру статуса
      throw e
    }
  }
  static logout = async () => {
    try {
      const fetchParams: IFetch = {
        endpoint: `user/logout`,
        method: FetchMethod.POST,
        data: null,
        params: undefined
      }
      await this._fetchData(fetchParams)
    } catch (e) {
      throw e
    }
  }
  static registerUser = async (user: IUser) => {
    try {
      const fetchParams: IFetch = {
        endpoint: `user/register`,
        method: FetchMethod.POST,
        data: user,
        params: undefined
      }
      await this._fetchData(fetchParams)
    } catch (e) {
      // TODO Добавить оповещение об ошибке по номеру статуса
      throw e
    }
  }

  /*-------------------------------------------
  * Permission types
  *------------------------------------------*/
  static getPermissionTypes = async () => {
    try {
      const fetchParams: IFetch = {
        endpoint: `user/permissions`,
        method: FetchMethod.POST,
        data: null,
        params: undefined
      }
      const response = await this._fetchData(fetchParams)
      return response
    } catch (e) {
      throw e
    }
  }

  /*--------------------------------
  * Users api
  *-------------------------------*/
  static users = async (user: IUser | IUser[] | null, method: FetchMethod): Promise<IUser[] | undefined> => {
    try {
      const fetchParams: IFetch = {
        endpoint: `user`,
        method: method,
        data: user ?? undefined,
        params: undefined
      }

      if (method === FetchMethod.DELETE) {
        Notify.create({
          type: 'warning',
          message: 'Пользователь удален'
        })
      } else {
        const response = await this._fetchData(fetchParams)
        isUser(response)
        return response
      }
    } catch (e) {
      throw e
    }
  }

  /*--------------------------------
  * Farms api
  *-------------------------------*/
  static farms = async (farm: IFarm | IFarm[] | null, method: FetchMethod): Promise<IFarm[] | undefined> => {
    try {
      // get farms id
      let farmsId: null | number[] = null
      if (FetchMethod.DELETE && farm && Array.isArray(farm)) {
        farmsId = farm.map(farmItem => farmItem.id)
      }

      const fetchParams: IFetch = {
        endpoint: `farm`,
        method: method,
        data: farm ?? undefined,
        params: {
          farmsId: farmsId
        }
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
  * Barns api
  *-------------------------------*/
  static barns = async (barn: IBarn | IBarn[] | null, method: FetchMethod, farm: IFarm): Promise<IBarn[] | undefined> => {
    try {
      // get boluses id
      let barnsId: null | number[] = null
      if (FetchMethod.DELETE && barn && Array.isArray(barn)) {
        barnsId = barn.map(barnItem => barnItem.id)
      }

      const fetchParams: IFetch = {
        endpoint: `barn`,
        method: method,
        data: barn ?? undefined,
        params: {
          farmId: farm?.id,
          barnId: barnsId
        }
      }
      const response = await this._fetchData(fetchParams)

      switch (method) {
        case FetchMethod.GET:
          // guard
          isBarn(response)
          return response
        case FetchMethod.POST:
          Notify.create({
            type: 'positive',
            message: 'Коровник добавлен'
          })
          break
        case FetchMethod.DELETE:
          Notify.create({
            type: 'warning',
            message: 'Коровники удалены'
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
  static boluses = async (bolus: IBolus | IBolus[] | null, method: FetchMethod, farm: IFarm, barn: IBarn): Promise<IBolus[] | undefined> => {
    try {
      // get boluses id
      let bolusesId: null | number[] = null
      if (FetchMethod.DELETE && bolus && Array.isArray(bolus)) {
        bolusesId = bolus.map(bolusItem => bolusItem.id)
      }

      const fetchParams: IFetch = {
        endpoint: `bolus`,
        method: method,
        data: bolus ?? undefined,
        params: {
          farmId: farm.id,
          barnId: barn.id,
          bolusId: bolusesId
        }
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
  static animals = async (animal: IAnimal | IAnimal[] | null, method: FetchMethod, farm: IFarm, barn: IBarn): Promise<IAnimal[] | undefined> => {
    try {

      // get animals id
      let animalsId: null | number[] = null
      if (FetchMethod.DELETE && animal && Array.isArray(animal)) {
        animalsId = animal.map(animalItem => animalItem.id)
      }

      const fetchParams: IFetch = {
        endpoint: `bolus`,
        method: method,
        data: animal ?? undefined,
        params: {
          farmId: farm.id,
          barnId: barn.id,
          animalId: animalsId
        }
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

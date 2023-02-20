import ky from 'ky';
import { Notify } from 'quasar';


const enum FetchMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

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

  /*
  * example
  * */
  static example = async (): Promise<unknown> => {
    try {
      const fetchParams: IFetch = {
        endpoint: `/product`,
        method: FetchMethod.GET,
        data: null,
        params: undefined
      }
      const response = await this._fetchData(fetchParams)
      // guards

      return  response
    } catch (e) {
      throw e
    }
  }

}

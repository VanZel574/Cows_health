import {IAnimal, IBolus, IFarm} from "src/utils/models";


export function isFarm(data: unknown): asserts data is IFarm[] {
  if (!!data && Array.isArray(data) && data.every(item => typeof item === 'object' && 'id' in item && 'name' in item)) {
    return
  } else {
    throw new Error('value is not farm interface')
  }
}

export function isBolus(data: unknown): asserts data is IBolus[] {

}

export function isAnimal(data: unknown): asserts data is IAnimal[] {

}

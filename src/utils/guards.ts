import {IAnimal, IAnimalList, IBarnList, IDevice, IFarmList, ITag, IUser, IUserList} from "src/utils/models";


export function isFarmList(data: unknown): asserts data is IFarmList {
  if (
    !!data
    && typeof data === 'object'
    && 'count' in data
    && 'farms' in data
    && Array.isArray(data.farms)
    && data.farms.every(item => typeof item === 'object' && 'farm_id' in item && 'name' in item))
  {
    return
  } else {
    throw new Error('value is not farm interface')
  }
}

export function isBarnList(data: unknown): asserts data is IBarnList[] {
  if (
    !!data
    && Array.isArray(data)
    && data.every(item =>
      typeof item === 'object'
      && 'farm_id' in item
      && 'barns' in item
      && typeof item.barns === 'object'
      && 'barns' in item.barns
      && Array.isArray(item.barns.barns)
    ))
  {
    return
  } else {
    throw new Error('value is not farm interface')
  }
}

export function isAnimalList(data: unknown): asserts data is IAnimalList[] {
  if (
    !!data
    && Array.isArray(data)
    && data.every(item =>
      typeof item === 'object'
      && 'barn_id' in item
      && 'cows' in item
    )
  ) {
    return
  } else {
    throw new Error('value is not animal list interface')
  }
}

export function isAnimal(data: unknown): asserts data is IAnimal[] {
  if (
    !!data
    && Array.isArray(data)
    && data.every(item =>
      typeof item === 'object'
      && 'cow_id' in item
      && 'name' in item
      && 'breed_id' in item
      && 'breed' in item
      && 'bolus_id' in item
      && 'bolus_sn' in item
      && 'date_of_born' in item
      && 'added_at' in item
      && 'Tags' in  item
    )
  ) {
    return
  } else {
    throw new Error('value is not animal interface')
  }
}

export function isTag(data: unknown): asserts data is ITag[] {
  if (
    !!data
    && Array.isArray(data)
    && data.every(item => typeof item === 'object' && 'tag_id' in item && 'value' in item)
  ) {
    return
  } else {
    throw new Error('value is not tag interface')
  }
}

export function isDevice(data: unknown): asserts data is IDevice[] {
  if (
    !!data
    && Array.isArray(data)
    && data.every(item =>
      typeof item === 'object'
      && 'device_id' in item
      && 'sn' in item
      && 'type' in item
      && 'info' in item
      && 'added_at' in item
      && 'charge' in item
      && 'cow_id' in item
      && 'cow_name' in item
    )
  ) {
    return
  } else {
    throw new Error('value is not device interface')
  }
}

export function isUser(data: unknown): asserts data is IUser {
  if (
    !!data
    && Array.isArray(data)
    && data.every(user =>
      typeof user === 'object'
      && 'id' in user
      && 'login' in user
      && 'email' in user
      && 'permission' in user
      && 'status' in user
      && 'added_at' in user
    )
  ) {
    return
  } else {
    throw new Error('value is not user interface')
  }
}

export function isUserList(data: unknown): asserts data is IUserList {
  if (
    !!data
    && typeof data === 'object'
    && 'users' in data
    && 'count' in data
  ) {
    return
  } else {
    throw new Error('value is not user list interface')
  }
}

export const enum FetchMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE"
}

export interface IFarm {
  id: number;
  name: string;
  address?: string;
  added_at?: Date
}

export interface IBarn {
  id : number;
  name: string;
  added_at?: Date
}

export interface IUserStore {
  isAuth: boolean;
  token: string | null;
  userId: number | null;
  role: string | null;
}

export interface IFarmStore {
  farmList: IFarm[]
  activeFarm: IFarm | null
}

export interface IAnimalStore {
  animals: IAnimal[]
}

export interface IBolusesStore {
  boluses: IBolus[]
}

export interface ITableHeader {
  name: string;
  label: string;
  align: string;
  sortable: boolean;
  headerStyle: string;
  field: string;
}

export interface ITableAction {
  icon: string;
  color: string;
  props: null | Object
  title: string;
  tooltip: string;
  component: Object
}

export interface IAnimal {
  id: number;
  name: string;
  dateOfBorn: Date;
  lactationDay: number;
  type: string;
  bolusID: number;
  bolusNum: number;
  calf: string;
  actions?: null
}

export interface IBolus {
  id: number;
  number: number;
  type: string;
  cowName: string;
  cowID: number;
  status: string;
  chargeLevel: number
}

export interface IUser {
  login: string;
  password: string;
  email?: string;
  permission?: string;
  status?: string;
  added_at?: Date
}

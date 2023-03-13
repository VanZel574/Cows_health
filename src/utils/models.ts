
export interface IFarmList {
  farms: IFarm[],
  count: number;
}

export interface IFarm {
  farm_id: number;
  name: string;
  address?: string;
  added_at: Date | string;
}

export interface IBarn {
  barn_id : number;
  name: string;
  added_at: Date | string;
}

export interface IBarnList {
  farm_id: number;
  barns: {
    barns: IBarn[]
  }
}

export interface IUserStore {
  isAuth: boolean;
  token: string | null;
  userId: number | null;
  role: string | null;
}

export interface IFarmStore {
  farmList: IFarm[];
  activeFarm: IFarm | null;
  count: number;
}

export interface IBarnStore {
  barnList: IBarn[];
  activeBarn: IBarn | null;
}

export interface IAnimalStore {
  animals: IAnimal[]
}

export interface IDevicesStore {
  devices: IDevice[]
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
  props?: null | Object
  title: string;
  tooltip: string;
  component: Object
}

export interface IAnimal {
  cow_id: number;
  name: string;
  breed_id: number;
  breed: string;
  bolus_id: string | null;
  bolus_sn: string | null;
  date_of_born: Date | string;
  added_at: Date | string;
  Tags: ITag[];
  actions?: null
}

export interface IAnimalList {
  barn_id: number;
  cows: IAnimal[]
}

export interface IDevice {
  device_id: number;
  sn: string;
  type: string;
  info: string;
  added_at: Date | string;
  cow_id: number;
  cow_name: string;
  charge: number;
  actions?: null
}

export interface IUser {
  id?: number;
  login: string;
  password: string;
  key?: string;
  email?: string;
  permission?: string;
  status?: string;
  added_at?: Date | string;
}

export interface IUserList {
  users: IUser[];
  count: number;
}

export interface ITag {
  tag_id: number;
  value: string;
  selected?: boolean
}

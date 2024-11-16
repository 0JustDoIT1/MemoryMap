import {KoreaMapData} from './koreaMap';

export interface Account {
  email: string;
  password: string;
}

export interface UserInfo extends Account {
  displayName: string;
}

export interface SignUp extends Account {
  passwordCheck: string;
}

export interface AppUser {
  uid: string;
  email: string;
  displayName: string;
}

export interface AppData {
  uid: string;
  email: string;
  koreaMapData: KoreaMapData;
  regionCount: RegionCount;
}

export interface RegionCount {
  [key: string]: {
    color: number;
    story: number;
  };
}

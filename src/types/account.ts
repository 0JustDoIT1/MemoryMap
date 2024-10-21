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
  email: string;
  displayName: string;
}

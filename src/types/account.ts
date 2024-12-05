export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp extends SignIn {
  passwordCheck: string;
}

export interface FirebaseUser {
  uid: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface User extends FirebaseUser {
  subscribe: boolean;
}

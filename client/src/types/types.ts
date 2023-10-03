export interface IUser {
  id: number | undefined;
  email: string | undefined;
  token: string | undefined;
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IResponseUser {
  id: number | undefined;
  email: string | undefined;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
}

export interface IResponseUserData {
  token: string;
  expires: string;
  user: IResponseUser;
}

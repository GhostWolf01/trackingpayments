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

export interface ICategory {
  title: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  transactions?: ITransaction[];
}

export interface ITransaction {
  [key: string]: any;
  title: string;
  id: number;
  amount: number;
  createdAt: string;
  updatedAt: string;
  type: string;
  category?: ICategory;
}

export interface IRequestMethods {
  [key: string]: () => Promise<void>;
  POST: () => Promise<void>;
  PATCH: () => Promise<void>;
  DELETE: () => Promise<void>;
}

export interface IResponseTransactionsLoader {
  categories: ICategory[];
  transactions: ITransaction[];
  totalIncome: number;
  totalExpense: number;
}

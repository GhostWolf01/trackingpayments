import { IUserData, IResponseUserData, IUser } from './../types/types';
import { apiFetch } from './../api/fetch.api.ts';
export const AuthService = {
  async registration(
    userData: IUserData,
  ): Promise<IResponseUserData | undefined> {
    const user = await apiFetch<IResponseUserData>('/user', {
      method: 'POST',
      body: userData,
    });
    return user;
  },
  async login(userData: IUserData): Promise<IResponseUserData | undefined> {
    const user = await apiFetch<IResponseUserData>('/auth/login', {
      method: 'POST',
      body: userData,
    });
    return user;
  },
  async getProfile(): Promise<IUser | undefined> {
    const user = await apiFetch<IUser>('/auth/profile', {
      method: 'GET',
    });
    return user;
  },
};

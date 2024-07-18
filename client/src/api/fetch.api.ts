// http://localhost:3001/api
import { ofetch } from 'ofetch';
import { getTokenFromCookies } from '../helpers/cookies.helper';

export type methodsFetch = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface IDataFetchError {
  error: string | undefined;
  message: string | undefined;
  statusCode: number | undefined;
}

export const apiFetch = ofetch.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    Authorization: 'Bearer ' + getTokenFromCookies(),
  },
});

// export function fetchApi(url: string = '', data: object = {}, ) {
//   const response = await ofetch(url, );
// }

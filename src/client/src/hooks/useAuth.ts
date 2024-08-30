import { getTokenFromCookies } from '../helpers/cookies.helper';
import { useAppSelector } from '../store/hooks';

export function useAuth(): boolean {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return isAuth;
}

export function useAuthCookies(): boolean {
  const isAuth = Boolean(getTokenFromCookies());

  return isAuth;
}

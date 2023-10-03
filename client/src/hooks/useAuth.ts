import { useAppSelector } from '../store/hooks';

export function useAuth(): boolean {
  const isAuth = useAppSelector((state) => state.user.isAuth);

  return isAuth;
}

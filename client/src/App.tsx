import { RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { useAppDispatch } from './store/hooks';
import { getTokenFromCookies } from './helpers/cookies.helper';
import { AuthService } from './services/auth.service';
import { login, logout } from './store/users/userSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { IDataFetchError } from './api/fetch.api';
import { FetchError } from 'ofetch';

function App() {
  const dispatch = useAppDispatch();

  async function checkAuth() {
    const token = getTokenFromCookies();
    try {
      if (token) {
        const data = await AuthService.getProfile();
        if (data) {
          dispatch(login(data));
        } else {
          dispatch(logout());
        }
      }
    } catch (_e: any) {
      const error: FetchError<IDataFetchError> = _e;
      toast.error(error.data?.message);
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return <RouterProvider router={router} />;
}

export default App;

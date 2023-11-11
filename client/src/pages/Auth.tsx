import { FC, useState } from 'react';
import { AuthService } from '../services/auth.service';
import { toast } from 'react-toastify';
import { FetchError } from 'ofetch';
import { IDataFetchError } from '../api/fetch.api';
import { setTokenToCookies } from '../helpers/cookies.helper';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/users/userSlice';
import { useNavigate } from 'react-router-dom';

const Auth: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.registration({ email, password });
      if (data) {
        toast.success('Account has been created.');
        setIsLogin(!isLogin);
      }
    } catch (_e: any) {
      const error: FetchError<IDataFetchError> = _e;
      toast.error(error.data?.message);
    }
  };

  const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const data = await AuthService.login({ email, password });
      if (data) {
        setTokenToCookies('jwtToken', data.token, {
          expires: new Date(data.expires),
        });
        dispatch(
          login({
            ...data.user,
            token: data.token,
          }),
        );
        toast.success('You logged id.');
        navigate('/');
      }
    } catch (_e: any) {
      const error: FetchError<IDataFetchError> = _e;
      toast.error(error.data?.message);
    }
  };

  return (
    <div className="mt-40 flex flex-col justify-center items-center bg-slate-900 text-white">
      <h1 className="text-center text-xl mb-10">
        {isLogin ? 'Login' : 'Registration'}
      </h1>

      <form
        className="flex w-1/3 flex-col mx-auto gap-5"
        onSubmit={isLogin ? loginHandler : registrationHandler}
      >
        <input
          className="input"
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-green mx-auto">Submit</button>
      </form>

      <div className="flex justify-center mt-5">
        {isLogin ? (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            You don't have an account?
          </button>
        ) : (
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-slate-300 hover:text-white"
          >
            Already have an account?
          </button>
        )}
      </div>
    </div>
  );
};

export default Auth;

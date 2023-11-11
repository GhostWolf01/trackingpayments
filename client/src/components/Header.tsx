import { FC } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBtc, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useAppDispatch } from '../store/hooks';
import { logout } from '../store/users/userSlice';
import { removeTokenFromCookies } from '../helpers/cookies.helper';
import { toast } from 'react-toastify';

const Header: FC = () => {
  const isAuth = useAuth();

  function isActiveClass(props: { isActive: boolean; isPending: boolean }) {
    return props.isActive ? 'text-white' : 'text-white/50';
  }

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function logoutHandler() {
    dispatch(logout());
    removeTokenFromCookies();
    toast.success('You logged out.');
    navigate('/');
  }

  return (
    <header className="flex items-center p-4 bg-slate-800 shadow-sm backdrop-blur-sm">
      <Link to="/">
        <FaBtc size={20} />
      </Link>
      {/* Menu */}
      {isAuth && (
        <nav className="ml-auto mr-10">
          <ul className="flex items-center gap-5">
            <li>
              <NavLink to={'/'} className={isActiveClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to={'/transactions'} className={isActiveClass}>
                Transactions
              </NavLink>
            </li>
            <li>
              <NavLink to={'/categories'} className={isActiveClass}>
                Categories
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
      {/* Actions */}
      {isAuth ? (
        <button className="btn btn-red" onClick={logoutHandler}>
          <span>Log Out</span>
          <FaSignOutAlt />
        </button>
      ) : (
        <Link
          className="py-2 text-white/50 hover:text-white ml-auto"
          to={'auth'}
        >
          Log In / Sing In
        </Link>
      )}
    </header>
  );
};

export default Header;

import { FC } from 'react';
import { useAuth, useAuthCookies } from '../hooks/useAuth';
import { NavLink, useLoaderData } from 'react-router-dom';
import TransactionsChart from '../components/TransactionsChart';
import {
  ICategory,
  IResponseTransactionsLoader,
  ITransaction,
} from '../types/types';
import TransactionsTable from '../components/TransactionsTable';
import { apiFetch } from '../api/fetch.api';

export const homeTransactionsLoader = async () => {
  const isAuth = useAuthCookies();
  // eslint-disable-next-line prefer-const
  let totalIncome = 0;
  let totalExpense = 0;
  let categories: ICategory[] = [];
  let transactions: ITransaction[] = [];
  if (isAuth) {
    [categories, transactions, totalIncome, totalExpense] = await Promise.all([
      apiFetch<ICategory[]>('/categories', {
        method: 'GET',
      }),
      apiFetch<ITransaction[]>('/transactions', {
        method: 'GET',
      }),
      apiFetch<number>('/transactions/find?type=income', {
        method: 'GET',
      }),
      apiFetch<number>('/transactions/find?type=expense', {
        method: 'GET',
      }),
    ]);
    totalIncome = Number(totalIncome);
    totalExpense = Number(totalExpense);
  }
  return { categories, transactions, totalIncome, totalExpense };
};

const Home: FC = () => {
  const isAuth = useAuth();

  const { totalIncome, totalExpense } =
    useLoaderData() as IResponseTransactionsLoader;

  return (
    <>
      {/* Menu */}
      {isAuth && (
        <>
          <nav className="my-5">
            <ul className="flex items-center gap-5">
              <li>
                <NavLink
                  to={'/transactions'}
                  className={'btn btn-blue max-w-fit mt-2 text-white'}
                >
                  Transactions
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/categories'}
                  className={'btn btn-blue max-w-fit mt-2 text-white'}
                >
                  Categories
                </NavLink>
              </li>
            </ul>
          </nav>
          {/* Statistic blocks */}
          <div className="my-5">
            <TransactionsChart
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              width={912}
              height={400}
            />
          </div>
          {/* Transaction Table */}
          <div className="my-5">
            <TransactionsTable limit={5} action={false} />
          </div>
        </>
      )}
    </>
  );
};

export default Home;

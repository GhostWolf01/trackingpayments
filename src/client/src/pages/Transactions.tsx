import { FC } from 'react';
import TransactionsForm from '../components/TransactionsForm';
import { ActionFunctionArgs, useLoaderData } from 'react-router-dom';
import { apiFetch } from '../api/fetch.api';
import {
  ICategory,
  IRequestMethods,
  IResponseTransactionsLoader,
  ITransaction,
} from '../types/types';
import { toast } from 'react-toastify';
import TransactionsTable from '../components/TransactionsTable';
import TransactionsChart from '../components/TransactionsChart';

export const transactionsLoader = async () => {
  // eslint-disable-next-line prefer-const
  let [categories, transactions, totalIncome, totalExpense] = await Promise.all(
    [
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
    ],
  );
  totalIncome = Number(totalIncome);
  totalExpense = Number(totalExpense);
  return { categories, transactions, totalIncome, totalExpense };
};

export const transactionsAction = async ({ request }: ActionFunctionArgs) => {
  const requestMethods: IRequestMethods = {
    POST: async () => {
      const formData = await request.formData();
      const transaction = {
        title: formData.get('title'),
        amount: Number(formData.get('amount')),
        category: formData.get('category'),
        type: formData.get('type'),
      };
      await apiFetch('/transactions', {
        method: 'POST',
        body: transaction,
      });
      toast.success('Transaction added.');
    },
    PATCH: async () => {
      const formData = await request.formData();
      const transaction = {
        id: formData.get('id'),
        title: formData.get('title'),
        amount: Number(formData.get('amount')),
        category: formData.get('category'),
        type: formData.get('type'),
      };
      await apiFetch(`/transactions/${transaction.id}`, {
        method: 'PATCH',
        body: transaction,
      });
    },
    DELETE: async () => {
      const formData = await request.formData();
      const transactionId = formData.get('id');
      await apiFetch(`/transactions/${transactionId}`, {
        method: 'DELETE',
      });
      toast.success('Transaction deleted.');
    },
  };

  await requestMethods[request.method]?.();
  return null;
};

const Transactions: FC = () => {
  const { totalIncome, totalExpense } =
    useLoaderData() as IResponseTransactionsLoader;
  return (
    <>
      <div className="mt-4 grid grid-cols-3 gap-4 items-start ">
        {/*  Add Transaction Form */}
        <div className="grid col-span-2 ">
          <TransactionsForm />
        </div>
        {/* Statistic blocks */}
        <TransactionsChart
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          width={240}
          height={240}
        />
      </div>

      {/* Transaction Table */}
      <div className="my-5">
        <TransactionsTable limit={5} />
      </div>
    </>
  );
};

export default Transactions;

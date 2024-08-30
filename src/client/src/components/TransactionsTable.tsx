import { FC, useEffect, useState } from 'react';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTransactionsLoader, ITransaction } from '../types/types';
import { FaTrash } from 'react-icons/fa';
import { formatDate } from '../helpers/date.helper';
import { formatToUSD } from '../helpers/currency.helper';
import { apiFetch } from '../api/fetch.api';
import ReactPaginate from 'react-paginate';

interface ITableHead {
  title: string;
  key: string;
  type: 'text' | 'date' | 'action' | 'idx' | 'amount';
  last: boolean;
}

export interface ITableTypesMethods {
  [key: string]: () => any;
  idx: () => number;
  text: () => string;
  date: () => string;
  amount: () => JSX.Element;
  action: () => JSX.Element;
}

interface ITransactionTable {
  limit: number;
  action?: boolean;
}

const TransactionsTable: FC<ITransactionTable> = ({
  limit = 5,
  action = true,
}: ITransactionTable) => {
  const { transactions: allTransactions } =
    useLoaderData() as IResponseTransactionsLoader;

  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchTransactions = async (page: number) => {
    const newTransactions = await apiFetch<ITransaction[]>(
      `/transactions/pagination?page=${page}&limit=${limit}`,
      {
        method: 'GET',
      },
    );
    setTransactions(newTransactions);
    setTotalPages(Math.ceil(allTransactions.length / limit));
  };

  function getTableHeads(): ITableHead[] {
    const tableHeads: ITableHead[] = [
      {
        title: '№',
        key: 'idx',
        type: 'idx',
        last: false,
      },
      {
        title: 'Title',
        key: 'title',
        type: 'text',
        last: false,
      },
      {
        title: 'Amount($)',
        key: 'amount',
        type: 'amount',
        last: false,
      },
      {
        title: 'Category',
        key: 'category',
        type: 'text',
        last: false,
      },
      {
        title: 'Date',
        key: 'createdAt',
        type: 'date',
        last: false,
      },
    ];
    if (action) {
      tableHeads.push({
        title: 'Action',
        key: 'action',
        type: 'action',
        last: true,
      });
    }
    return tableHeads;
  }

  const tableHeads: ITableHead[] = getTableHeads();

  function getTypeHead(
    tableHead: ITableHead,
    transaction: ITransaction,
    idx: number,
  ): JSX.Element {
    const tableTypesMethods: ITableTypesMethods = {
      idx: () => {
        return idx + 1;
      },
      text: () => {
        return tableHead.key === 'category'
          ? transaction[tableHead.key]?.title ?? 'Other'
          : transaction[tableHead.key];
      },
      date: () => {
        return formatDate(transaction.createdAt);
      },
      action: () => {
        return (
          <Form method="delete" action="/transactions">
            <input type="hidden" name="id" value={transaction.id} />
            <button className="btn hover:btn-red ml-auto">
              <FaTrash />
            </button>
          </Form>
        );
      },
      amount: () => {
        return (
          <span
            className={
              transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
            }
          >
            {`${transaction.type === 'income' ? '+' : '-'} ${formatToUSD.format(
              transaction.amount,
            )}`}
          </span>
        );
      },
    };
    return <>{tableTypesMethods[tableHead.type]()}</>;
  }

  const handlePageChange = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected + 1);
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, transactions]);

  return (
    <>
      <ReactPaginate
        className="flex gap-3 justify-end mt-4 items-center"
        activeClassName="bg-blue-600 rounded-sm"
        pageLinkClassName="text-white text-xs py-1 px-2 rounded-sm"
        previousClassName="text-white text-xs py-1 px-2 bg-slate-800 rounded-sm"
        nextClassName="text-white text-xs py-1 px-2 bg-slate-800 rounded-sm"
        disabledClassName="text-white/50 cursor-not-allowed"
        disabledLinkClassName="text-slate-600 cursor-not-allowed"
        pageCount={totalPages}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
      />
      <div className="bg-slate-800 px-4 py-3 mt-4 rounded-md">
        <table className="w-full">
          <thead>
            <tr>
              {tableHeads.map((tableHead, idx) => (
                <td
                  key={idx}
                  className={tableHead.last ? 'text-right' : 'font-bold'}
                >
                  {tableHead.title}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, idx) => (
              <tr key={idx}>
                {tableHeads.map((tableHead, hIdx) => (
                  <td key={hIdx}>{getTypeHead(tableHead, transaction, idx)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TransactionsTable;

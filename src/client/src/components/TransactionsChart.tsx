import { FC } from 'react';
import { formatToUSD } from '../helpers/currency.helper';
import Chart from '../components/Chart';

interface IPropsTransactionsChart {
  totalIncome: number;
  totalExpense: number;
  width?: number;
  height?: number;
}

const TransactionsChart: FC<IPropsTransactionsChart> = ({
  totalIncome,
  totalExpense,
  width,
  height,
}) => {
  return (
    <div className="rounded-md bg-slate-800 p-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="uppercase text-md text-center font-bold">
            Total Income:
          </p>
          <p className="bg-green-600 p-1 rounded-sm mt-2 text-center">
            {formatToUSD.format(totalIncome)}
          </p>
        </div>
        <div>
          <p className="uppercase text-md text-center font-bold">
            Total Expense:
          </p>
          <p className="bg-red-500 p-1 rounded-sm mt-2 text-center">
            {formatToUSD.format(totalExpense)}
          </p>
        </div>
      </div>
      <Chart
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        width={width}
        height={height}
      />
    </div>
  );
};

export default TransactionsChart;

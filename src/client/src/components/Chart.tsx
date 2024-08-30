import { FC } from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

interface IChart {
  totalIncome: number;
  totalExpense: number;
  width?: number;
  height?: number;
}

interface IData {
  value: number;
  name: string;
}

const COLORS = ['rgb(22, 163, 74)', 'rgb(239, 68, 68)'];

const Chart: FC<IChart> = ({ totalIncome, totalExpense, width, height }) => {
  const data: IData[] = [
    { value: totalIncome, name: 'Income' },
    { value: totalExpense, name: 'Expense' },
  ];
  return (
    <PieChart className="m-auto" width={width} height={height}>
      <Pie
        data={data}
        cx={'50%'}
        cy={'50%'}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend />
      <Tooltip />
    </PieChart>
  );
};

export default Chart;

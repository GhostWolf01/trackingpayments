import { FC, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Form, useLoaderData } from 'react-router-dom';
import { IResponseTransactionsLoader } from '../types/types';
import CategoryModal from './CategoryModal';

const TransactionsForm: FC = () => {
  const { categories } = useLoaderData() as IResponseTransactionsLoader;

  const [visibleCreateModal, setVisibleCreateModal] = useState<boolean>(false);

  return (
    <div className="rounded-md bg-slate-800 p-4">
      <Form className="grid gap-2" method="post" action="/transactions">
        <label className="grid" htmlFor="title">
          <span>Title</span>
          <input
            className="input border-slate-800"
            type="text"
            placeholder="Title..."
            name="title"
            required
          ></input>
        </label>
        <label className="grid border-slate-800" htmlFor="amount">
          <span>Amount</span>
          <input
            className="input"
            type="number"
            placeholder="Amount..."
            name="amount"
            required
          ></input>
        </label>

        {/* Select */}
        {categories.length ? (
          <label htmlFor="category" className="grid">
            <span>Category</span>
            <select className="input border-slate-800" name="category" required>
              {categories.map((category, idx) => (
                <option value={category.id} key={idx}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <h1 className="mt-1 text-red-300">
            To continue create a category first
          </h1>
        )}

        {/* Add Category */}
        <button
          type="button"
          onClick={() => setVisibleCreateModal(true)}
          className="max-w-fit flex items-center gap-2 text-white/50 hover:text-white"
        >
          <FaPlus />
          <span>Manege Categories</span>
        </button>

        {/* Radio Buttons */}
        <div className="flex gap-4 items-center">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value={'income'}
              className="form-radio text-blue-600"
            />
            <span>Income</span>
          </label>
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="radio"
              name="type"
              value={'expense'}
              className="form-radio text-blue-600"
            />
            <span>Expense</span>
          </label>
        </div>

        {/* Submit button */}
        <button type="submit" className="btn btn-green max-w-fit mt-2">
          Submit
        </button>
      </Form>

      {/* Add Category Modal */}
      {visibleCreateModal && (
        <CategoryModal type="POST" setVisibleModal={setVisibleCreateModal} />
      )}
    </div>
  );
};

export default TransactionsForm;

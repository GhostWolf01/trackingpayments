import { FC, useState } from 'react';
import { AiFillCloseCircle, AiFillEdit } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { ActionFunctionArgs, Form, useLoaderData } from 'react-router-dom';
import CategoryModal from '../components/CategoryModal';
import { apiFetch } from '../api/fetch.api';
import { ICategory, IRequestMethods } from '../types/types';
import { toast } from 'react-toastify';

export const categoryLoader = async () => {
  const categories = await apiFetch<ICategory[]>('/categories', {
    method: 'GET',
  });
  return categories;
};

export const categoriesAction = async ({ request }: ActionFunctionArgs) => {
  const requestMethods: IRequestMethods = {
    POST: async () => {
      const formData = await request.formData();
      const category = {
        title: formData.get('title'),
      };
      await apiFetch('/categories', {
        method: 'POST',
        body: category,
      });
      toast.success('Category added.');
    },
    PATCH: async () => {
      const formData = await request.formData();
      const category = {
        id: formData.get('id'),
        title: formData.get('title'),
      };
      await apiFetch(`/categories/${category.id}`, {
        method: 'PATCH',
        body: category,
      });
      toast.success('Category updated.');
    },
    DELETE: async () => {
      const formData = await request.formData();
      const categoryId = formData.get('id');
      await apiFetch(`/categories/${categoryId}`, {
        method: 'DELETE',
      });
      toast.success('Category deleted.');
    },
  };

  await requestMethods[request.method]?.();
  return null;
};

const Categories: FC = () => {
  const categories = useLoaderData() as ICategory[];
  const [categoryId, setCategoryId] = useState<number>(0);

  const [visibleEditModal, setVisibleEditModal] = useState<boolean>(false);
  const [visibleCreateModal, setVisibleCreateModal] = useState<boolean>(false);

  return (
    <>
      <div className="mt-10 p-4 rounded-md bg-slate-800">
        <h1> Your category list:</h1>
        {/* Category List */}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="group py-2 px-4 rounded-lg bg-blue-600 flex items-center relative gap-2"
            >
              {category.title}
              <div className="absolute px-3 left-0 top-0 bottom-0 right-0 rounded-lg bg-black/90 items-center justify-between hidden group-hover:flex">
                <button
                  onClick={() => {
                    setCategoryId(category.id);
                    setVisibleEditModal(true);
                  }}
                >
                  <AiFillEdit></AiFillEdit>
                </button>

                <Form className="flex" method="delete" action="/categories">
                  <input type="hidden" name="id" value={category.id} />
                  <button type="submit">
                    <AiFillCloseCircle />
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>

        {/* Add Category */}
        <button
          onClick={() => setVisibleCreateModal(true)}
          className="max-w-fit flex items-center gap-2 text-white/50 mt-5 hover:text-white"
        >
          <FaPlus />
          <span>Create a new category</span>
        </button>
      </div>

      {/* Add Category Modal */}
      {visibleCreateModal && (
        <CategoryModal type="POST" setVisibleModal={setVisibleCreateModal} />
      )}

      {/* Edit Category Modal */}
      {visibleEditModal && (
        <CategoryModal
          type="PATCH"
          id={categoryId}
          setVisibleModal={setVisibleEditModal}
        />
      )}
    </>
  );
};

export default Categories;

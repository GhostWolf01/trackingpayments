import { FC } from 'react';
import page_not_found from '../assets/page_not_found.png';
import { Link } from 'react-router-dom';

const ErrorPage: FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 font-roboto text-white flex justify-center items-center flex-col gap-10 relative">
      <img
        src={page_not_found}
        alt="page not found"
        className="h-screen absolute"
      />
      <Link
        to={'/'}
        className="bg-sky-500 rounded-md px-6 py-2 hover:bg-sky-600 absolute bottom-1/4 text-lg"
      >
        Back
      </Link>
    </div>
  );
};

export default ErrorPage;

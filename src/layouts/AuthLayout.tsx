import { FilmIcon } from '@heroicons/react/16/solid'
import { Link, Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify';

export default function AuthLayout() {
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col sm:justify-center items-center pt-6 sm:pt-0">
        <Link to='/home' className="flex items-center gap-2 mb-10">
            <div className="w-15 h-15 bg-red-700 rounded-xl p-2">
                <FilmIcon className="text-white " />
            </div>
            <span className="text-4xl font-bold">CinePlex</span>
        </Link>
        <Outlet />
        <ToastContainer position='top-right' />
    </div>
  )
}

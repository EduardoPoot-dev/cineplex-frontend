import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import MovieScreeningCard from '@/components/screening/MovieScreeningCard'

export default function MovieScreeningLayout() {
    return (
        <main className=' bg-gray-100 min-h-screen py-4' >
            <div className='container mx-auto'>
                <MovieScreeningCard />

                <div className='2xl:w-3/5 p-5 lg:p-0 mx-auto'>
                    <div className='bg-white border rounded-xl p-7 border-gray-300 mt-10'>
                        <Outlet />
                    </div>
                </div>
            </div>
            <ToastContainer position='top-right' />
        </main>
    )
}

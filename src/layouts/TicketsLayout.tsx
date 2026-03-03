import { TicketIcon } from '@heroicons/react/24/outline'
import { Outlet } from 'react-router'
import TicketsNavigation from '@/components/tickets/TicketsNavigation'

export default function TicketsLayout() {
  return (
    <main className='max-w-6xl mx-auto p-2 lg:p-0'>
      <div className='text-center py-10 space-y-5'>

        <div className='w-fit p-5 bg-red-100 rounded-xl mx-auto'>
          <TicketIcon width={50} className='text-red-700' />
        </div>
        <h1 className='text-5xl font-bold'>Mis boletos</h1>
        <h2 className='text-gray-600 text-xl'>Gestiona tus entradas y accede a tus códigos QR</h2>
      </div>

      <TicketsNavigation />

      <div className='py-10'>
        <Outlet />
      </div>
    </main>
  )
}

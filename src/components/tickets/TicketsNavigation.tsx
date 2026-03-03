import { ClockIcon, TicketIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router'

const navigation = [
  {
    path: '/tickets/actived',
    name: 'Próximos',
    icon: <TicketIcon width={20} />
  },
  {
    path: '/tickets/expired',
    name: 'Historial',
    icon: <ClockIcon width={20} />
  },
]

export default function TicketsNavigation() {
    const location = useLocation()
    return (
        <nav className='bg-gray-100 p-2 lg:p-1 rounded-xl grid grid-cols-1 md:grid-cols-2'>
            {navigation.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`${item.path === location.pathname ? 'bg-white text-gray-800' : 'text-gray-600'} p-1  flex justify-center gap-2 rounded-lg text-center font-semibold`}
                >
                    {item.icon}
                    {item.name}
                </Link>
            ))}
        </nav>
    )
}

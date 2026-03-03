import { Link, useLocation } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import { TicketIcon } from "@heroicons/react/24/outline";
import { ArrowLeftStartOnRectangleIcon, UserIcon } from "@heroicons/react/16/solid";
import { useAuth } from "@/hooks/useAuth";
import Logo from "@/components/ui/Logo";


export default function NavBar() {
    const location = useLocation()
    const path =location.pathname

    const queryClient = useQueryClient()
    const { user, authenticated } = useAuth()

    const navigation = [
        {
            name: "Inicio",
            path: '/home'
        },
        {
            name: "Cartelera",
            path: '/movies'
        },
        {
            name: "Próximamente",
            path: '/movies/soon'
        }
    ]

    const handleLogout = () => {
        localStorage.removeItem('AUTH_TOKEN')
        queryClient.invalidateQueries({queryKey: ['user']})
    }

    return (
        <div className="border-b border-gray-200 py-2 md:py-0">
            <div className="container mx-auto flex flex-col gap-8 lg:gap-0 lg:flex-row justify-between items-center py-6">
                <Logo />

                <nav>
                    <ul className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        {
                            navigation.map((item) => (
                                <li key={item.path}>
                                    <Link 
                                        to={item.path} 
                                        className={`${path === item.path ? 'text-gray-800 font-semibold' : 'text-gray-600'} text-lg`}
                                    >
                                        {item.name}
                                    </Link>
                                </li> 
                            ))
                        }
                    </ul>
                </nav>

                <nav className="mt-3 md:mt-0">
                    {user && authenticated  ? (
                        <ul className="flex flex-col md:flex-row items-center gap-8 lg:gap-4">
                            <li>
                                <p className="font-semibold text-lg ">
                                    <span className="text-red-700">Bienvenido:</span> {''}
                                    {user.name}
                                </p>
                            </li>
                            <li>
                                <Link 
                                    to='/tickets/actived'
                                    className="flex lg:block p-2 rounded-lg hover:bg-yellow-500 text-gray-500  hover:text-black transition-colors"
                                >
                                    <TicketIcon width={25} height={25} className="" />
                                    <span className="lg:hidden block ml-2 lg:ml-0">Mis boletos</span>
                                </Link>
                            </li>
                            <li>
                                {user.isAdmin && (
                                    <Link 
                                        to='/admin'
                                        className="block cursor-pointer p-2 rounded-lg bg-yellow-500 text-black font-semibold"
                                    >
                                        Administrar
                                    </Link>
                                )}
                            </li>
                            <li>
                                <button 
                                    className="block cursor-pointer p-2 rounded-lg bg-red-700 text-white font-semibold"
                                    onClick={handleLogout}
                                >
                                    <ArrowLeftStartOnRectangleIcon width={20} height={20} className="inline-block mr-2" />
                                    Cerrar sesión
                                </button>
                            </li>
                        </ul>
                        
                    ) : (
                        <ul className="flex items-center gap-6">
                            <li>
                                <Link 
                                    to='/auth/login' 
                                    className="flex items-center  gap-2 text-white bg-red-700 p-2 rounded-lg font-semibold"
                                >
                                    <UserIcon className="block w-4 h-4" />
                                    Ingresar
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>

                
            </div>
        </div>
    )
}
/*
<li>
                            <Link 
                                to='/tickets'
                                className="block w-5 h-5"
                            >
                                <TicketIcon className="text-gray-600" />
                            </Link>
                        </li>
*/

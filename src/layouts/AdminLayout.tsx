import { Navigate, Outlet } from 'react-router'
import NavBar from '@/components/ui/NavBar'
import { useAuth } from '@/hooks/useAuth'
import { ToastContainer } from 'react-toastify'

export default function AdminLayout() {
    const { user } = useAuth()

    if(user) return (
        <>
            {!user.isAdmin && <Navigate to='/home' />}
            <NavBar />
            <main>
                <Outlet />
            </main>
            <ToastContainer />
        </>
    )
        
}

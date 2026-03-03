import { Outlet } from 'react-router';
import NavBar from '@/components/ui/NavBar';

export default function MainLayout() {
  return (
    <div>
      <NavBar />

      <Outlet />
    </div>
  )
}

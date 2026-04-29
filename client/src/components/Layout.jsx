// components/Layout.jsx
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import useAuth from '../hooks/use-auth';

const Layout = () => {
  const { userRole } = useAuth();
  const location = useLocation();
  
  // Don't show sidebar on auth pages
  const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {!isAuthPage && userRole && <Sidebar />}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
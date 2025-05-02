import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

const PublicRoute = () => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to="/monitoring" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;

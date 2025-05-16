import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useProfileStore } from '@/stores/profileStore';
import { getSessionInfo } from '@/apis/LoginApi';

const PrivateRoute = () => {
  const { isLoggedIn, clearAuth } = useAuthStore();
  const { setProfile } = useProfileStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const userInfo = await getSessionInfo();
        setProfile(() => userInfo);
      } catch (error) {
        console.log(error);
        const isInitialLoad = sessionStorage.getItem('initialLoadDone');
  
        if (isInitialLoad) {
          alert('로그인 후 이용하세요');
        }
  
        clearAuth();
      } finally {
        sessionStorage.setItem('initialLoadDone', 'true');
        setChecking(false);
      }
    };
  
    verifySession();
  }, []);

  if (checking) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

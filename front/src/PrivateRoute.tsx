import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');

  const isTokenExpired = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  };

  if (!token || isTokenExpired(token) || !userId) {
    return <Navigate to="/auth" replace />;
  }

  if (location.pathname === '/') {
    return <Navigate to="/quiz/mypage" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

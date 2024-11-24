import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');

  if (!token && !userId) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;

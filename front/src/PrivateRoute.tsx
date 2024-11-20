import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

const PrivateRoute = () => {
  const token = localStorage.getItem('authToken');
  const userId = localStorage.getItem('userId');

  if (!token && !userId) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateRoute;

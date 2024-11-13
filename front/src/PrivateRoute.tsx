import { Navigate, Outlet } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';

const PrivateRoute = () => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default PrivateRoute;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './page/Auth';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './PrivateRoute';
const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/quiz',
    element: <PrivateRoute />,
    children: [
      {
        path: 'start',
        element: <div>hoge</div>,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
);

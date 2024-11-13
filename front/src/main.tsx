import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth } from './page/Auth';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './PrivateRoute';
import { Mypage } from './page/Mypage';
import { QuizStart } from './page/QuizStart';
import { QuizEdit } from './page/QuizEdit';
import { QuizPost } from './page/QuizPost';
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
        path: 'mypage',
        element: <Mypage />,
      },
      {
        path: 'start',
        element: <QuizStart />,
      },
      {
        path: 'post',
        element: <QuizPost />,
      },
      {
        path: 'edit',
        element: <QuizEdit />,
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

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Auth } from './page/Auth';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from './PrivateRoute';
import { Mypage } from './page/Mypage';
import { QuizStart } from './page/QuizStart';
import { QuizList } from './page/QuizList';
import { QuizPost } from './page/QuizPost';
import { QuizEdit } from './page/QuizEdit';
import { QuizPlay } from './page/QuizPlay';
import { Layout } from './components/layout/Layout';
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
        element: (
          <Layout>
            <Mypage />
          </Layout>
        ),
      },
      {
        path: 'start',
        element: (
          <Layout>
            <QuizStart />
          </Layout>
        ),
      },
      {
        path: 'post',
        element: (
          <Layout>
            <QuizPost />
          </Layout>
        ),
      },
      {
        path: 'list',
        element: (
          <Layout>
            <QuizList />
          </Layout>
        ),
      },
      {
        path: 'edit/:quizId',
        element: (
          <Layout>
            <QuizEdit />
          </Layout>
        ),
      },
      {
        path: 'play',
        element: <QuizPlay />,
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

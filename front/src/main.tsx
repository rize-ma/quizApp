import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Input } from './components/ui/input';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Input />
        <div className="w-full bg-orange-700"></div>
      </div>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

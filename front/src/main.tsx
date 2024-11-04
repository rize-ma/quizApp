import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Button } from './components/ui/button/button';
import { ChevronsRight } from 'lucide-react';
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="flex">
        <Button className="m-5">
          <ChevronsRight color="#ffffff" strokeWidth={2} />
          次へ
        </Button>
      </div>
    ),
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

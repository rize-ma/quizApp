import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FC } from 'react';
import { Layout } from '../components/layout/Layout';

interface TestLayoutProps {
  children: ReactNode;
}

export const TestLayout: FC<TestLayoutProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <Layout>{children}</Layout>
    </BrowserRouter>
  );
};

import type { ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar/sidebar';
import { AppSidebar } from './AppSidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider className="bg-black-opacity-80">
      <AppSidebar />
      <main className="flex text-white w-full">
        <SidebarTrigger className="mr-5 bg-zinc-900 hover:bg-white hover:text-black" />
        {children}
      </main>
    </SidebarProvider>
  );
};

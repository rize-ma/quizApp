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
      <main>
        <SidebarTrigger className="bg-zinc-900 text-white hover:bg-white hover:text-black" />
        {children}
      </main>
    </SidebarProvider>
  );
};

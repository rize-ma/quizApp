import { createContext, FC, useContext, type ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar/sidebar';
import { AppSidebar } from './AppSidebar';
import { NotificationInstance } from 'antd/es/notification/interface';

interface LayoutProps {
  children: ReactNode;
}
export const NotificationContext = createContext<NotificationInstance | null>(
  null,
);

export const Layout: FC<LayoutProps> = ({ children }) => {
  const notification = useContext(NotificationContext);
  return (
    <NotificationContext.Provider value={notification}>
      <SidebarProvider className="bg-black-opacity-80">
        <AppSidebar />
        <main className="flex text-white w-full">
          <SidebarTrigger className="mr-5 bg-zinc-900 hover:bg-white hover:text-black" />
          {children}
        </main>
      </SidebarProvider>
    </NotificationContext.Provider>
  );
};

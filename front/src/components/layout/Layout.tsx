import { createContext, FC, type ReactNode } from 'react';
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar/sidebar';
import { AppSidebar } from './AppSidebar';
import { notification } from 'antd';
import { NotificationInstance } from 'antd/es/notification/interface';

interface LayoutProps {
  children: ReactNode;
}
export const NotificationContext = createContext<NotificationInstance | null>(
  null,
);

export const Layout: FC<LayoutProps> = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  return (
    <NotificationContext.Provider value={api}>
      {contextHolder}
      <SidebarProvider className="bg-black-opacity-80 h-screen">
        <AppSidebar />
        <main className="flex text-white w-full">
          <SidebarTrigger className="mr-5 bg-zinc-900 hover:bg-white hover:text-black" />
          {children}
        </main>
      </SidebarProvider>
    </NotificationContext.Provider>
  );
};

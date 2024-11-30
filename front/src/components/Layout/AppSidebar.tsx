import { List, Play, Plus, User } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar/sidebar';
import { LogoutAlertDialog } from '../ui/alert-dialog/alert-dialog';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';

export const AppSidebar: FC = () => {
  const navigate = useNavigate();
  const items = [
    {
      title: 'マイページ',
      url: '/quiz/mypage',
      icon: <User />,
    },
    {
      title: 'クイズに挑戦',
      url: '/quiz/start',
      icon: <Play />,
    },
    {
      title: 'クイズを投稿',
      url: '/quiz/post',
      icon: <Plus />,
    },
    {
      title: 'クイズ一覧',
      url: '/quiz/list',
      icon: <List />,
    },
  ];

  const onClickLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('authToken');
    navigate('/auth');
  };

  return (
    <Sidebar>
      <SidebarHeader className="bg-zinc-900 text-white">
        クイズAPP
      </SidebarHeader>
      <SidebarContent className="bg-zinc-900 text-white">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white">メニュー</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="rounded-xl">
                    <a href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="rounded-xl">
                  <LogoutAlertDialog onClickLogout={onClickLogout} />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

import { Pencil, Play, Plus, User } from 'lucide-react';
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

export const AppSidebar = () => {
  const items = [
    {
      title: 'マイページ',
      url: './mypage',
      icon: <User />,
    },
    {
      title: 'クイズに挑戦',
      url: './start',
      icon: <Play />,
    },
    {
      title: 'クイズを投稿',
      url: './post',
      icon: <Plus />,
    },
    {
      title: 'クイズを編集',
      url: './edit',
      icon: <Pencil />,
    },
  ];

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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

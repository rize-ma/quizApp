import type { Meta, StoryObj } from '@storybook/react/*';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from './sidebar';
import { Pencil, Play, Plus, User } from 'lucide-react';
const meta: Meta<typeof Sidebar> = {
  title: 'components/ui/sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: '',
  },
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>ヘッダー</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>ラベル</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="">
                      <span>メニュー1</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="">
                      <span>メニュー2</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <a href="">
                      <span>メニュー3</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>フッター</SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  ),
};

const items = [
  {
    title: 'マイページ',
    url: '',
    icon: <User />,
  },
  {
    title: 'クイズに挑戦',
    url: '',
    icon: <Play />,
  },
  {
    title: 'クイズを投稿',
    url: '',
    icon: <Plus />,
  },
  {
    title: 'クイズを編集',
    url: '',
    icon: <Pencil />,
  },
];
/**
 * こちらのサイドバーを採用予定
 * */
export const AppSidebar: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="bg-zinc-900 text-white">
          クイズAPP
        </SidebarHeader>
        <SidebarContent className="bg-zinc-900 text-white">
          <SidebarGroup>
            <SidebarGroupLabel className="text-white">
              メニュー
            </SidebarGroupLabel>
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
    </SidebarProvider>
  ),
};

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
} from '@/components/ui/sidebar';
import { CircleAlert, Home } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const items = [
  {
    title: 'Home',
    url: '#',
    icon: Home,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>FE-accelerator</SidebarGroupLabel>
          <SidebarGroupContent>icon / logo / menu</SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Framework</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="react">
                    <span className="flex items-center gap-2">
                      <CircleAlert />
                      React
                    </span>
                  </SelectItem>
                  <SelectItem value="angular">
                    <span className="flex items-center gap-2">
                      <CircleAlert />
                      Angular
                    </span>
                  </SelectItem>
                  <SelectItem value="svelte">
                    <span className="flex items-center gap-2">
                      <CircleAlert />
                      Svelte
                    </span>
                  </SelectItem>
                  <SelectItem value="vue">
                    <span className="flex items-center gap-2">
                      <CircleAlert />
                      Vue
                    </span>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Examples</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
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
}

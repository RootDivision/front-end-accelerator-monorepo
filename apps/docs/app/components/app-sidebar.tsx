import { getFolders, getProjectsByFramework } from '@/api';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { queryIds } from '@/const';
import { useQuery } from '@tanstack/react-query';
import { MoonIcon } from 'lucide-react';
import { NavLink, useParams } from 'react-router';

import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export function AppSidebar() {
  const { framework } = useParams();

  const foldersQuery = useQuery({
    queryFn: () => getFolders(),
    queryKey: [queryIds.GET_FOLDERS],
  });

  console.log('foldersQuery: ', foldersQuery.data);
  // const projectsQuery = useQuery({
  //   enabled: !!framework && !!foldersQuery.isSuccess,
  //   queryFn: () => getProjectsByFramework(framework!),
  //   queryKey: [queryIds.GET_PROJECTS_BY_FRAMEWORK, framework],
  // });

  return (
    <Sidebar>
      {/* <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>FE-accelerator</SidebarGroupLabel>
          <SidebarGroupContent>
            <Button size={'icon'} variant="outline">
              <MoonIcon />
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Framework</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              onValueChange={(value) => {
                // page refresh for iFrame removal
                window.location.href = `/${value}`;
              }}
              value={framework}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a framework" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {foldersQuery.data?.map((folder) => (
                    <SelectItem key={folder.name} value={folder.name}>
                      {folder.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        {projectsQuery.isSuccess && (
          <SidebarGroup>
            <SidebarGroupLabel>Examples</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {projectsQuery.data?.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <NavLink to={`/${framework}/${project.name}`}>
                        <span>{project.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent> */}
    </Sidebar>
  );
}

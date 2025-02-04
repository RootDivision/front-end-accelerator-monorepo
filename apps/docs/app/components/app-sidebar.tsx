import { getFolders, getProjects } from '@/api';
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
import { useAppStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { MoonIcon } from 'lucide-react';
import { NavLink, useNavigate, useParams } from 'react-router';

import { FoldersSelect } from './folders-select';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export const FrameworkLogo = ({ framework }: { framework: string }) => {
  const logos: Record<string, string> = {
    angular: '/angular-logo.svg',
    next: '/next-logo.svg',
    react: '/react-logo.svg',
  };

  if (!logos[framework]) return null;

  return (
    <img alt={`${framework} logo`} className="w-6 h-6" src={logos[framework]} />
  );
};

export function AppSidebar() {
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  const navigate = useNavigate();
  const { framework = '' } = useParams();

  const foldersQuery = useQuery({
    queryFn: () => getFolders(),
    queryKey: [queryIds.GET_FOLDERS],
  });

  const conceptsQuery = useQuery({
    enabled: !!framework && !!foldersQuery.isSuccess,
    queryFn: () =>
      getProjects({
        framework,
        type: 'concepts',
      }),
    queryKey: [queryIds.GET_CONCEPTS, framework],
  });

  const examplesQuery = useQuery({
    enabled: !!framework && !!foldersQuery.isSuccess,
    queryFn: () =>
      getProjects({
        framework,
        type: 'examples',
      }),
    queryKey: [queryIds.GET_EXAMPLES, framework],
  });

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>FE-accelerator</SidebarGroupLabel>
          <SidebarGroupContent>
            <Button onClick={toggleTheme} size={'icon'} variant="outline">
              <MoonIcon />
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Framework</SidebarGroupLabel>
          <SidebarGroupContent>
            <FoldersSelect />
          </SidebarGroupContent>
        </SidebarGroup>

        {conceptsQuery.isSuccess && !!conceptsQuery.data.length && (
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase font-bold">
              Concepts
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {conceptsQuery.data.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <NavLink to={`/${framework}/concepts/${project.name}`}>
                        <FrameworkLogo framework={framework!} />
                        <span>{project.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {examplesQuery.isSuccess && !!examplesQuery.data.length && (
          <SidebarGroup>
            <SidebarGroupLabel>Examples</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {examplesQuery.data.map((project) => (
                  <SidebarMenuItem key={project.name}>
                    <SidebarMenuButton asChild>
                      <NavLink to={`/${framework}/examples/${project.name}`}>
                        <FrameworkLogo framework={framework!} />
                        <span>{project.name}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}

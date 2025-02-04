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
import { NavLink, useParams } from 'react-router';

import { FoldersSelect } from './folders-select';

export const FrameworkLogo = ({ framework }: { framework: string }) => {
  const theme = useAppStore((state) => state.theme);

  const logos: Record<string, string> = {
    angular: '/angular-logo.svg',
    next: theme === 'light' ? '/next-logo.svg' : '/next-logo-dark.svg',
    react: '/react-logo.svg',
  };

  if (!logos[framework]) return null;

  return (
    <img alt={`${framework} logo`} className="w-6 h-6" src={logos[framework]} />
  );
};

export function AppSidebar() {
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
          <SidebarGroupContent className="py-2 flex flex-col space-y-8">
            <div className="flex items-center space-x-4">
              <img
                alt="Front-end Accelerator"
                className="h-12"
                src="/logo.svg"
              />

              <p className="font-bold">Front-end Accelerator</p>
            </div>

            <p className="flex flex-col space-y-4 text-xs leading-5">
              Speed up your Front-end development with pre-made building blocks
              in React, Next, Angular, Vue, Nuxt, Svelte, SvelteKit,...
            </p>
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

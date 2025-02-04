import sdk from '@stackblitz/sdk';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChevronRight, ExternalLink, MoonIcon, SunIcon } from 'lucide-react';
import { useLayoutEffect } from 'react';
import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useParams,
} from 'react-router';

import type { Route } from './+types/root';

import stylesheet from './app.css?url';
import { AppSidebar } from './components/app-sidebar';
import { FoldersSelect } from './components/folders-select';
import { Button } from './components/ui/button';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { useAppStore } from './store';

export const links: Route.LinksFunction = () => [
  { href: stylesheet, rel: 'stylesheet' },
];

const queryClient = new QueryClient();
const stackblitzUrl = 'RootDivision/front-end-accelerator-monorepo/';

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  const { framework, name, type } = useParams();

  useLayoutEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <SidebarProvider>
            <AppSidebar />
            <main className="p-4 space-y-4 flex flex-col w-full">
              <div className="flex items-center justify-between">
                <div className="flex space-x-4 items-center grow">
                  <SidebarTrigger className="w-8 h-8" variant="outline" />
                  {framework && (
                    <div className="flex items-center space-x-4">
                      <ChevronRight /> <FoldersSelect />
                    </div>
                  )}
                  {framework && name && (
                    <div className="flex items-center space-x-4">
                      <ChevronRight className="w-5" />
                      <span>{name}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-4 items-center">
                  {framework && name && (
                    <>
                      <Button
                        onClick={() => {
                          sdk.openGithubProject(
                            `${stackblitzUrl}/tree/main/apps/demo/${framework}/${type}/${name}`
                          );
                        }}
                        variant="outline"
                      >
                        <ExternalLink />
                        Open in StackBlitz
                      </Button>
                      <Button
                        onClick={() => {
                          window.open(
                            `https://github.com/${stackblitzUrl}/tree/main/apps/demo/${framework}/${type}/${name}`,
                            '_blank'
                          );
                        }}
                        variant="outline"
                      >
                        <ExternalLink />
                        Open in GitHub
                      </Button>
                    </>
                  )}
                  <Button
                    className=" w-9 "
                    onClick={toggleTheme}
                    variant="outline"
                  >
                    {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                  </Button>
                </div>
              </div>
              {children}
            </main>
          </SidebarProvider>
          <ScrollRestoration />
          <Scripts />
        </QueryClientProvider>
      </body>
    </html>
  );
}

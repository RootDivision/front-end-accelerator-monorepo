import { index, route, type RouteConfig } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route(':framework', 'routes/framework.tsx'),
  route(':framework/:name', 'routes/detail.tsx'),
] satisfies RouteConfig;

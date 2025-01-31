import { lucideIcons } from '../icons/lucide';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './posts/posts.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';
import { TypographyComponent } from './typography/typography.component';

export const appName = 'My Angular App';

export const mainRoutes = [
  {
    component: DashboardComponent,
    icon: lucideIcons.CodeSquare,
    label: 'Dashboard',
    path: '',
    title: `Dashboard | ${appName}`,
  },
  {
    component: TaskComponent,
    icon: lucideIcons.ListChecks,
    label: 'Posts',
    path: 'posts',
    title: `Posts | ${appName}`,
  },
  {
    component: ProductsComponent,
    icon: lucideIcons.Disc3,
    label: 'Products',
    path: 'products',
    title: `Products | ${appName}`,
  },

  {
    component: TypographyComponent,
    icon: lucideIcons.House,
    label: 'Typography',
    path: 'typography',
    title: `Typography | ${appName}`,
  },
  {
    component: SettingsComponent,
    icon: lucideIcons.Link,
    label: 'Settings',
    path: 'settings',
    title: `Settings | ${appName}`,
  },
];

export const detailRoutes = [
  {
    component: ProductDetailComponent,
    icon: lucideIcons.File,
    label: 'Detail',
    path: 'products/:id',
    title: `Detail | ${appName}`,
  },
];

export const routes = [...mainRoutes, ...detailRoutes];

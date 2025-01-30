import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { LucideAngularModule } from 'lucide-angular';

import { mainRoutes } from '~/app/app.routes';
import { AppSignalStore } from '~/app/app.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BrnSeparatorComponent,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmAvatarImageDirective,
    HlmSeparatorDirective,
    RouterLink,
    RouterLinkActive,
    LucideAngularModule,
  ],
  selector: 'component-nav-sidebar-items',
  standalone: true,
  template: `
    <section
      class="flex h-screen flex-col items-start justify-between space-y-2 p-2"
    >
      <div>
        <ul class="flex flex-col space-y-2">
          @for (route of routes; track route.path) {
            <li>
              <a
                class="active flex items-center space-x-2 rounded-md p-2 hover:bg-primary hover:text-secondary [&.active]:bg-primary [&.active]:text-secondary"
                routerLinkActive="active"
                routerLink="{{ route.path }}"
                [routerLinkActiveOptions]="{ exact: true }"
              >
                <lucide-angular [img]="route.icon" />
                @if (store.ui.sidebar.isOpen()) {
                  <span>{{ route.label }}</span>
                }
              </a>
            </li>
          }
        </ul>
        @if (store.ui.sidebar.isOpen()) {
          <div class="p-2">
            <brn-separator class="my-2" hlmSeparator />
            <p class="text-sm text-muted-foreground">
              This business application is designed to streamline financial
              operations and enhance decision-making processes for enterprises.
            </p>
          </div>
        }
      </div>

      @if (store.ui.sidebar.isOpen()) {
        <div class="w-full p-2">
          <brn-separator class="my-2" hlmSeparator />
          <div class="flex w-full items-center space-x-4">
            <hlm-avatar>
              <img alt="avatar-image" hlmAvatarImage src="" />
              <span class="bg-destructive text-white" hlmAvatarFallback
                >JD</span
              >
            </hlm-avatar>
            <span>John Doe</span>
          </div>
        </div>
      }
    </section>
  `,
})
export class SidebarItemsComponent {
  readonly store = inject(AppSignalStore);

  routes = mainRoutes;
}

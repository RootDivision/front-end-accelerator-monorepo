import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  HlmAvatarComponent,
  HlmAvatarFallbackDirective,
  HlmAvatarImageDirective,
} from '@spartan-ng/ui-avatar-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { LucideAngularModule } from 'lucide-angular';

import { mainRoutes } from '~/app/app.routes';
import { AppSignalStore } from '~/app/app.store';
import { lucideIcons } from '~/icons/lucide';

import { CommandPreviewComponent } from '../search/search-command.component';
import { SelectThemeComponent } from '../select-theme/select-theme.component';
import { DropdownPreviewComponent } from './notifications/notifications.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CommandPreviewComponent,
    DropdownPreviewComponent,
    HlmAvatarComponent,
    HlmAvatarFallbackDirective,
    HlmAvatarImageDirective,
    HlmButtonDirective,
    LucideAngularModule,
    RouterLink,
    RouterLinkActive,
    SelectThemeComponent,
  ],
  selector: 'app-topbar',
  standalone: true,
  template: `
    <section
      class="flex items-center space-x-4 border-b border-secondary bg-background p-4"
    >
      <div class="flex grow items-center space-x-4">
        @if (store.ui.sidebar.isVisible()) {
          <button
            aria-label="Toggle Sidebar"
            class="hidden md:flex"
            hlmBtn
            size="icon"
            variant="outline"
            (click)="store.toggleSidebarIsOpen()"
          >
            <lucide-angular
              [img]="
                store.ui.sidebar.isOpen()
                  ? icons.ChevronLeft
                  : icons.ChevronRight
              "
            />
          </button>
        }

        <lucide-angular [img]="icons.Box" />
        <h1 class="flex items-center">
          {{ store.ui.title() }}
        </h1>
      </div>

      <component-search-command />
      <component-nav-notifications />

      <button
        class="rounded-full"
        hlmBtn
        size="icon"
        variant="outline"
        (click)="store.toggleContainer()"
      >
        <lucide-angular
          [img]="store.ui.container.isActive() ? icons.Expand : icons.Shrink"
        />
      </button>

      @if (store.ui.topbar.themeSwitcher.isVisible()) {
        <component-select-theme class="hidden md:flex" />
      }

      <hlm-avatar>
        <img alt="avatar-image" hlmAvatarImage src="" />
        <span class="bg-destructive text-white" hlmAvatarFallback>VH</span>
      </hlm-avatar>
    </section>

    @if (store.ui.navbar.isVisible()) {
      <nav
        class="sticky top-0 flex grow items-center space-x-4 overflow-x-auto bg-background p-4"
      >
        <ul class="flex space-x-4">
          @for (route of routes; track route.path) {
            <li>
              <a
                class="flex items-center justify-center space-x-2 rounded-md px-2 py-1 hover:bg-primary hover:text-secondary [&.active]:bg-primary [&.active]:text-secondary"
                routerLinkActive="active"
                routerLink="{{ route.path }}"
                [routerLinkActiveOptions]="{ exact: true }"
              >
                <lucide-angular [img]="route.icon" />

                <span>
                  {{ route.label }}
                </span>
              </a>
            </li>
          }
        </ul>
      </nav>
    }
  `,
})
export class TopbarComponent {
  readonly icons = lucideIcons;
  readonly store = inject(AppSignalStore);

  routes = mainRoutes;
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToasterComponent } from '@spartan-ng/ui-sonner-helm';

import { SidebarItemsComponent } from '../components/nav/sidebar-items/sidebar-items.component';
import { TopbarComponent } from '../components/nav/topbar.component';
import { AppSignalStore } from './app.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    HlmToasterComponent,
    RouterOutlet,
    SidebarItemsComponent,
    TopbarComponent,
  ],
  selector: 'app-root',
  standalone: true,
  template: `
    <main class="flex text-foreground">
      @if (store.ui.sidebar.isVisible()) {
        <aside
          class="fixed hidden h-full flex-col border-r border-secondary bg-background md:flex"
          data-testid="sidebar"
          [ngClass]="{
            'w-64': store.ui.sidebar.isOpen(),
            'w-[56px]': !store.ui.sidebar.isOpen(),
          }"
        >
          <component-nav-sidebar-items />
        </aside>
      }

      <section
        class="w-full"
        [ngClass]="{
          'ml-0 md:ml-64 md:w-[calc(100%-16rem)]':
            store.ui.sidebar.isOpen() && store.ui.sidebar.isVisible(),
          'ml-0 md:ml-[56px] md:w-[calc(100%-56px)]':
            !store.ui.sidebar.isOpen() && store.ui.sidebar.isVisible(),
        }"
      >
        <app-topbar />
        <section class="bg-secondary">
          <div
            class="p-4"
            [ngClass]="{ 'container py-12': store.ui.container.isActive() }"
          >
            <router-outlet />
          </div>
        </section>
      </section>
    </main>
    <hlm-toaster />
  `,
})
export class AppComponent {
  readonly store = inject(AppSignalStore);
}

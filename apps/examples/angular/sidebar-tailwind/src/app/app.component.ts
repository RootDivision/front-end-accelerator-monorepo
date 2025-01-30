import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AppSignalStore } from './app.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  selector: 'app-root',
  standalone: true,
  template: `<h1>hello world Angular</h1>
    <main class="flex text-foreground">
      <aside
        class="fixed hidden h-full flex-col border-r border-secondary bg-background md:flex"
        data-testid="sidebar"
        [ngClass]="{
          'w-64': store.ui.sidebar.isOpen(),
          'w-[56px]': !store.ui.sidebar.isOpen(),
        }"
      >
        asdasdas
      </aside>

      <section
        class="w-full"
        [ngClass]="{
          'ml-0 md:ml-64 md:w-[calc(100%-16rem)]':
            store.ui.sidebar.isOpen() && store.ui.sidebar.isVisible(),
          'ml-0 md:ml-[56px] md:w-[calc(100%-56px)]':
            !store.ui.sidebar.isOpen() && store.ui.sidebar.isVisible(),
        }"
      >
        <div>topbar</div>

        <section class="bg-secondary">
          <div
            class="p-4"
            [ngClass]="{ 'container py-12': store.ui.container.isActive() }"
          >
            <h1>Outlet</h1>
          </div>
        </section>
      </section>
    </main> `,
})
export class AppComponent {
  readonly store = inject(AppSignalStore);
}

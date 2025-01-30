import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppSignalStore } from './app.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  template: `
    <div class="flex h-screen">
      <aside
        class="bg-gray-50 border-gray-300 fixed flex-col h-full left-0 top-0 border-r hidden md:flex"
        [ngClass]="{
          'w-64': store.ui.sidebar.isOpen(),
          'w-[56px]': !store.ui.sidebar.isOpen(),
        }"
      >
        <div class="p-4">Logo</div>
      </aside>

      <div
        class="flex flex-col md:hidden"
        [ngClass]="{
          'fixed w-full h-full bg-red-500': !store.ui.sidebar.isOpen(),
        }"
      >
        Overlay
      </div>

      <main
        class="bg-gray-50 w-full"
        [ngClass]="{
          'md:ml-64 md:w-[calc(100%-16rem)] ml-0': store.ui.sidebar.isOpen(),
          'md:ml-[56px] md:w-[calc(100%-56px)] ml-0':
            !store.ui.sidebar.isOpen(),
        }"
      >
        <div class="bg-white border-b border-gray-300 p-4 sticky top-0 z-10">
          <button (click)="store.toggleSidebarIsOpen()">Toggle sidebar</button>
        </div>

        <div class="flex flex-col gap-4 h-full p-4">
          <h1>Outlet</h1>
          <div class="bg-red-50 h-96">asd</div>
          <div class="bg-red-50 h-96">asd</div>
          <div class="bg-red-50 h-96">asd</div>
          <div class="bg-red-50 h-96">asd</div>
          <div class="bg-red-50 h-96">asd</div>
          <div class="bg-red-50 h-96">asd</div>
          <div class="bg-red-50 h-96">asd</div>
        </div>
      </main>
    </div>
  `,
})
export class AppComponent {
  readonly store = inject(AppSignalStore);
}

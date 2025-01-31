import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { HlmSwitchComponent } from '@spartan-ng/ui-switch-helm';
import { toast } from 'ngx-sonner';

import { AppSignalStore } from '../app.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    HlmCardContentDirective,
    HlmCardDescriptionDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmButtonDirective,
    HlmInputDirective,

    HlmLabelDirective,
    HlmSwitchComponent,
  ],
  selector: 'app-settings',
  standalone: true,
  template: `
    <div class="flex h-full space-x-16">
      <ul class="w-36 p-2">
        <li>
          <a>General info</a>
        </li>
      </ul>

      <div class="flex grow flex-col space-y-4">
        <article class="rounded-2xl p-4" hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>App name</h3>
            <p hlmCardDescription>Change your app name here</p>
          </div>
          <p hlmCardContent>
            <input
              class="w-full"
              hlmInput
              placeholder="Type here..."
              type="text"
              [(ngModel)]="currentTitle"
            />
          </p>
          <div class="flex justify-end" hlmCardFooter>
            <button hlmBtn (click)="updateAppTitle()">Save</button>
          </div>
        </article>
        <article class="rounded-2xl p-4" hlmCard>
          <div hlmCardHeader>
            <h3 hlmCardTitle>UI Settings</h3>
            <p hlmCardDescription>Toggle UI settings here</p>
          </div>
          <div class="grid grid-cols-3 gap-4" hlmCardContent>
            <span class="flex items-center" hlmLabel>
              <hlm-switch
                class="mr-2"
                [ngModel]="store.ui.sidebar.isVisible()"
                (ngModelChange)="toggleSidebar()"
              />
              Sidebar
            </span>
            <span class="flex items-center" hlmLabel>
              <hlm-switch
                class="mr-2"
                [ngModel]="store.ui.navbar.isVisible()"
                (ngModelChange)="toggleNavbar()"
              />
              Navbar
            </span>
            <span class="flex items-center" hlmLabel>
              <hlm-switch
                class="mr-2"
                [ngModel]="store.ui.topbar.themeSwitcher.isVisible()"
                (ngModelChange)="toggleThemeSwitcher()"
              />
              Theme switcher
            </span>
          </div>
        </article>
      </div>
    </div>
  `,
})
export class SettingsComponent {
  currentTitle = signal('');
  readonly store = inject(AppSignalStore);

  toggleNavbar() {
    this.store.toggleNavbarVisibility();
    toast(
      `Navbar ${this.store.ui.navbar.isVisible() ? 'enabled' : 'disabled'}`,
      {
        description:
          'Navbar visibility has been toggled through the ngRx store',
      },
    );
  }

  toggleSidebar() {
    this.store.toggleSidebarVisibility();

    toast(
      `Sidebar ${this.store.ui.sidebar.isVisible() ? 'enabled' : 'disabled'}`,
      {
        description:
          'Sidebar visibility has been toggled through the ngRx store',
      },
    );
  }

  toggleThemeSwitcher() {
    this.store.toggleThemeSwitcherVisibility();
    toast(
      `Theme switcher ${
        this.store.ui.topbar.themeSwitcher.isVisible() ? 'enabled' : 'disabled'
      }`,
      {
        description:
          'Theme switcher visibility has been toggled through the ngRx store',
      },
    );
  }

  updateAppTitle() {
    this.store.setAppTitle(this.currentTitle());

    toast(`${this.currentTitle()} updated`, {
      description: 'App title has been updated through the ngRx store',
    });
  }
}

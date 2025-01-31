import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';

import { AppSignalStore } from '~/app/app.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BrnSelectImports, HlmSelectImports, CommonModule, FormsModule],
  selector: 'component-select-theme',
  standalone: true,
  template: `
    <brn-select
      placeholder="Select an option"
      [ngModel]="store.ui.theme()"
      (ngModelChange)="selectTheme($event)"
    >
      <hlm-select-trigger class="w-40">
        <hlm-select-value />
      </hlm-select-trigger>
      <hlm-select-content>
        @for (theme of themes(); track theme) {
          <hlm-option [value]="theme">
            {{ theme }}
          </hlm-option>
        }
      </hlm-select-content>
    </brn-select>
  `,
})
export class SelectThemeComponent {
  readonly store = inject(AppSignalStore);

  themes = signal([
    'light',
    'dark',
    'red',
    'red-dark',
    'blue',
    'blue-dark',
    'yellow',
    'yellow-dark',
    'green',
    'green-dark',
  ]);

  selectTheme(theme: string) {
    this.store.setTheme(theme);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AlertPreviewComponent } from './dashboard.alert.component';
import { CardPreviewComponent } from './dashboard.highlight.component';
import { ProductTableComponent } from './dashboard.product-table.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardPreviewComponent, ProductTableComponent, AlertPreviewComponent],
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <section class="flex flex-col space-y-4">
      <app-dashboard-alert-component />
      <app-dashboard-highlight />
      <app-dashboard-product-table />
      <app-dashboard-highlight />
    </section>
  `,
})
export class DashboardComponent {}

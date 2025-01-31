import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { LucideAngularModule } from 'lucide-angular';

import { lucideIcons } from '~/icons/lucide';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmAlertDirective,
    HlmAlertDescriptionDirective,
    HlmAlertTitleDirective,
    LucideAngularModule,
  ],
  selector: 'app-dashboard-alert-component',
  standalone: true,
  template: `
    <div class="flex items-center space-x-4" hlmAlert>
      <lucide-angular [img]="icons.Box" />
      <div>
        <h4 hlmAlertTitle>Important Update</h4>
        <p hlmAlertDesc>
          This is a dashboard with data from dummjson API. Please review the
          latest changes and update your settings accordingly. Note: You can
          horizontally scroll to see more data.
        </p>
      </div>
    </div>
  `,
})
export class AlertPreviewComponent {
  readonly icons = lucideIcons;
}

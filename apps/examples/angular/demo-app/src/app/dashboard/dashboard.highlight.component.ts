import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
import { LucideAngularModule } from 'lucide-angular';

import { lucideIcons } from '~/icons/lucide';

interface Framework {
  label: string;
  value: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmButtonDirective,
    LucideAngularModule,
  ],
  selector: 'app-dashboard-highlight',
  standalone: true,
  template: `
    <div class="flex space-x-4 overflow-auto">
      @for (highlight of highlights; track $index) {
        <section class="w-96 shrink-0" hlmCard>
          <div
            class="flex flex-row items-center justify-between space-x-2"
            hlmCardHeader
          >
            <h3 hlmCardTitle>{{ highlight.label }}</h3>

            <!-- <hlm-icon name="{{ highlight.icon }}" /> -->
          </div>
          <div class="space-y-4" hlmCardContent>
            <p class="text-2xl">
              {{ highlight.value }}
            </p>
            <p hlmCardDescription>{{ highlight.description }}</p>
          </div>
          <div class="flex justify-end" hlmCardFooter>
            <button hlmBtn size="icon" variant="secondary">
              <lucide-angular [img]="icons.Link" />
            </button>
          </div>
        </section>
      }
    </div>
  `,
})
export class CardPreviewComponent {
  public currentFramework = signal<Framework | undefined>(undefined);
  public highlights = [
    {
      description: 'Number of followers on Twitter',
      icon: 'lucideTwitter',
      label: 'Twitter subs',
      value: '849165',
    },
    {
      description: 'Number of followers on Instagram',
      icon: 'lucideInstagram',
      label: 'Instagram subs',
      value: '5461616',
    },
    {
      description: 'Number of followers on LinkedIn',
      icon: 'lucideTwitch',
      label: 'LinkedIn subs',
      value: '151651',
    },
    {
      description: 'Number of members on Slack',
      icon: 'lucideSlack',
      label: 'Slack members',
      value: '9651266',
    },
    {
      description: 'Number of followers on Twitter',
      icon: 'lucideTwitter',
      label: 'Twitter subs',
      value: '849165',
    },
    {
      description: 'Number of followers on Instagram',
      icon: 'lucideInstagram',
      label: 'Instagram subs',
      value: '5461616',
    },
    {
      description: 'Number of followers on LinkedIn',
      icon: 'lucideTwitch',
      label: 'LinkedIn subs',
      value: '151651',
    },
    {
      description: 'Number of members on Slack',
      icon: 'lucideSlack',
      label: 'Slack members',
      value: '9651266',
    },
  ];

  readonly icons = lucideIcons;
  public state = signal<'closed' | 'open'>('closed');

  commandSelected(framework: Framework) {
    this.state.set('closed');
    if (this.currentFramework()?.value === framework.value) {
      this.currentFramework.set(undefined);
    } else {
      this.currentFramework.set(framework);
    }
  }

  stateChanged(state: 'closed' | 'open') {
    this.state.set(state);
  }
}

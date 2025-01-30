import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { LucideAngularModule } from 'lucide-angular';

import { lucideIcons } from '~/icons/lucide';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmButtonDirective,
    HlmDialogComponent,
    BrnDialogTriggerDirective,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    BrnDialogContentDirective,
    BrnCommandImports,
    HlmCommandImports,
    LucideAngularModule,
  ],
  selector: 'component-search-command',
  standalone: true,
  template: `
    <div>
      <hlm-dialog>
        <button
          brnDialogTrigger
          class="rounded-full"
          hlmBtn
          size="icon"
          variant="outline"
        >
          <lucide-angular [img]="icons.Search" />
        </button>
        <hlm-dialog-content *brnDialogContent="let ctx">
          <hlm-dialog-header>
            <h3 hlmDialogTitle>Search</h3>
            <p hlmDialogDescription>
              Search quickly for commands, settings, and more.
            </p>
          </hlm-dialog-header>

          <brn-cmd class="w-[400px]" hlm>
            <hlm-cmd-input-wrapper>
              <lucide-angular [img]="icons.Search" />
              <input
                brnCmdInput
                hlm
                placeholder="Type a command or search..."
              />
            </hlm-cmd-input-wrapper>
            <div *brnCmdEmpty hlmCmdEmpty>No results found.</div>
            <brn-cmd-list hlm>
              <brn-cmd-group hlm label="Suggestions">
                <button brnCmdItem hlm>
                  <hlm-icon hlmCmdIcon name="lucideCalendar" />
                  Calendar
                </button>
                <button brnCmdItem hlm>
                  <hlm-icon hlmCmdIcon name="lucideSmile" />
                  Search Emoji
                </button>
                <button brnCmdItem hlm>
                  <hlm-icon hlmCmdIcon name="lucidePlus" />
                  Calculator
                </button>
              </brn-cmd-group>
              <brn-cmd-separator hlm />
              <brn-cmd-group hlm label="Settings">
                <button brnCmdItem hlm>
                  <hlm-icon hlmCmdIcon name="lucideUser" />
                  Profile
                  <hlm-cmd-shortcut>⌘P</hlm-cmd-shortcut>
                </button>
                <button brnCmdItem hlm>
                  <hlm-icon hlmCmdIcon name="lucideWallet" />
                  Billing
                  <hlm-cmd-shortcut>⌘B</hlm-cmd-shortcut>
                </button>
                <button brnCmdItem hlm>
                  <hlm-icon hlmCmdIcon name="lucideCog" />
                  Settings
                  <hlm-cmd-shortcut>⌘S</hlm-cmd-shortcut>
                </button>
              </brn-cmd-group>
            </brn-cmd-list>
          </brn-cmd>
        </hlm-dialog-content>
      </hlm-dialog>
    </div>
  `,
})
export class CommandPreviewComponent {
  readonly icons = lucideIcons;
}

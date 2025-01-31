import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  HlmH1Directive,
  HlmH2Directive,
  HlmH3Directive,
  HlmH4Directive,
  HlmLargeDirective,
  HlmLeadDirective,
  HlmMutedDirective,
  HlmPDirective,
  HlmSmallDirective,
  HlmUlDirective,
} from '@spartan-ng/ui-typography-helm';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HlmH1Directive,
    HlmH2Directive,
    HlmH3Directive,
    HlmH4Directive,
    HlmLargeDirective,
    HlmLeadDirective,
    HlmMutedDirective,
    HlmPDirective,
    HlmSmallDirective,
    HlmUlDirective,
  ],
  selector: 'app-typography',
  standalone: true,
  template: `
    <div class="flex flex-col space-y-4">
      <h1 hlmH1>H1 Title</h1>
      <h2 hlmH2>H2 Title</h2>
      <h3 hlmH3>H3 Title</h3>
      <h4 hlmH4>H4 Title</h4>
      <p hlmLarge>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
      <p hlmLead>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
      <p hlmMuted>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
      <p hlmSmall>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos.
      </p>

      <p hlmP>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad
        litora torquent per conubia nostra, per inceptos himenaeos.
      </p>
      <blockquote class="border-l-4 border-gray-500 pl-4 italic">
        This is a blockquote example. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante
        dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis
        sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
        porta. Mauris massa.
      </blockquote>
      <ul hlmUl>
        <li>Unordered list item 1</li>
        <li>Unordered list item 2</li>
        <li>Unordered list item 3</li>
      </ul>
      <ol hlmOl>
        <li>Ordered list item 1</li>
        <li>Ordered list item 2</li>
        <li>Ordered list item 3</li>
      </ol>

      <blockquote HlmBlockquote>
        "The only way to do great work is to love what you do." - Everyone
      </blockquote>
    </div>
  `,
})
export class TypographyComponent {}

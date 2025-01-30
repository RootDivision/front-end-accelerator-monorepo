import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmCheckboxComponent } from '@spartan-ng/ui-checkbox-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnMenuTriggerDirective } from '@spartan-ng/ui-menu-brain';
import { HlmMenuComponent } from '@spartan-ng/ui-menu-helm';
import {
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListComponent,
  HlmTabsTriggerDirective,
} from '@spartan-ng/ui-tabs-helm';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { LucideAngularModule } from 'lucide-angular';

import { lucideIcons } from '~/icons/lucide';
import { CommentService } from '~/services/comment.service';
import { queryKeys } from '~/services/queryKeys';
import { TodoService } from '~/services/todo.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    BrnMenuTriggerDirective,
    HlmMenuComponent,
    HlmButtonDirective,
    HlmTabsComponent,
    HlmTabsListComponent,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    HlmCheckboxComponent,
    HlmLabelDirective,
    CommonModule,
    LucideAngularModule,
  ],
  selector: 'component-nav-notifications',
  standalone: true,
  template: `
    <div>
      <button
        align="end"
        class="rounded-full"
        hlmBtn
        size="icon"
        variant="outline"
        [brnMenuTriggerFor]="menu"
      >
        <lucide-angular [img]="icons.Bell" />
      </button>
    </div>
    <ng-template #menu>
      <hlm-menu class="h-[400px] w-96 overflow-auto rounded-xl p-0">
        <hlm-tabs class="w-full" tab="todos">
          <hlm-tabs-list class="sticky top-0 grid h-12 w-full grid-cols-2">
            <button class="h-full" hlmTabsTrigger="todos">Todos</button>
            <button class="h-full" hlmTabsTrigger="comments">Comments</button>
          </hlm-tabs-list>
          <div class="pb-4" hlmTabsContent="todos">
            @for (todo of todosQuery.data()?.todos; track todo.id) {
              <div class="p-4">
                <label
                  class="flex items-center font-normal leading-5"
                  hlmLabel
                  for="todo-{{ $index }}"
                >
                  <hlm-checkbox class="mr-2" id="todo-{{ $index }}" />
                  {{ todo.todo }}
                </label>
              </div>
            }
          </div>

          <div class="pb-4" hlmTabsContent="comments">
            @for (comment of commentsQuery.data()?.comments; track comment.id) {
              <div class="flex justify-between space-x-2 p-4 text-sm">
                <div>
                  <p>{{ comment.body }}</p>
                  <p class="font-medium">by {{ comment.user.fullName }}</p>
                </div>

                <div class="flex items-center space-x-2">
                  <lucide-angular class="text-red-500" [img]="icons.Heart" />
                  <p>{{ comment.likes }}</p>
                </div>
              </div>
            }
          </div>
        </hlm-tabs>
      </hlm-menu>
    </ng-template>
  `,
})
export class DropdownPreviewComponent {
  readonly icons = lucideIcons;


  c = signal('')

  commentService = inject(CommentService);
  todoService = inject(TodoService);

  commentsQuery = injectQuery(() => ({
    queryFn: () => this.commentService.getComments(),
    queryKey: [queryKeys.GET_COMMENTS],
  }));

  todosQuery = injectQuery(() => ({
    queryFn: () => this.todoService.getTodos(),
    queryKey: [queryKeys.GET_TODOS],
  }));
}

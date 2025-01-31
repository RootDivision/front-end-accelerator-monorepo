import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { BrnSelectImports } from '@spartan-ng/ui-select-brain';
import { HlmSelectImports } from '@spartan-ng/ui-select-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import {
  injectQuery,
  injectQueryClient,
} from '@tanstack/angular-query-experimental';
import { LucideAngularModule } from 'lucide-angular';
import { toast } from 'ngx-sonner';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { PostsUserComponent } from '~/app/posts/posts.user.component';
import { lucideIcons } from '~/icons/lucide';
import { PostService } from '~/services/post.service';
import { queryKeys } from '~/services/queryKeys';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    HlmTableComponent,
    HlmTrowComponent,
    HlmThComponent,
    HlmTdComponent,
    HlmButtonDirective,
    HlmBadgeDirective,
    HlmInputDirective,
    HlmSpinnerComponent,
    HlmSelectImports,
    BrnSelectImports,
    ReactiveFormsModule,
    PostsUserComponent,
    LucideAngularModule,
  ],
  selector: 'app-posts',
  standalone: true,
  template: `
    <div
      class="flex flex-col space-y-4 overflow-auto rounded-md bg-background p-4"
    >
      <div class="flex space-x-4">
        <form class="flex grow space-x-4" [formGroup]="form">
          <input
            class="grow"
            formControlName="term"
            hlmInput
            placeholder="Debounced async search with TanStack Query"
          />

          <brn-select formControlName="sortBy" placeholder="Select a sort">
            <hlm-select-trigger class="w-40">
              <hlm-select-value />
            </hlm-select-trigger>
            <hlm-select-content>
              <hlm-option value="id">Id</hlm-option>
              <hlm-option value="title">Title</hlm-option>
              <hlm-option value="views">Views</hlm-option>
            </hlm-select-content>
          </brn-select>

          <brn-select formControlName="order" placeholder="Select an order">
            <hlm-select-trigger class="w-40">
              <hlm-select-value />
            </hlm-select-trigger>
            <hlm-select-content>
              <hlm-option value="asc">Asc</hlm-option>
              <hlm-option value="desc">Desc</hlm-option>
            </hlm-select-content>
          </brn-select>
        </form>

        <div class="flex space-x-4">
          <brn-select
            placeholder="Select an option"
            [multiple]="true"
            [(ngModel)]="columns"
          >
            <hlm-select-trigger>
              <hlm-select-value />
            </hlm-select-trigger>
            <hlm-select-content>
              <hlm-option value="views">Views</hlm-option>
              <hlm-option value="likes">Likes</hlm-option>
              <hlm-option value="dislikes">Dislikes</hlm-option>
            </hlm-select-content>
          </brn-select>

          <button hlmBtn (click)="reset()">
            <lucide-angular [img]="icons.RotateCcw" />
          </button>
        </div>
      </div>

      <hlm-table>
        <hlm-trow>
          <hlm-th class="w-16">Select</hlm-th>
          <hlm-th class="grow">Title</hlm-th>

          @if (columns().includes('views')) {
            <hlm-th class="w-24">Views</hlm-th>
          }
          @if (columns().includes('likes')) {
            <hlm-th class="w-24">Likes</hlm-th>
          }
          @if (columns().includes('dislikes')) {
            <hlm-th class="w-24">Dislikes</hlm-th>
          }
          @if (columns().includes('dislikes')) {
            <hlm-th class="w-24">Actions</hlm-th>
          }
        </hlm-trow>

        @if (postQuery.isLoading()) {
          <hlm-trow>
            <hlm-td>
              <hlm-spinner />
            </hlm-td>
          </hlm-trow>
        }

        @if (postQuery.data()?.posts?.length === 0) {
          <hlm-trow>
            <hlm-td class="text-center" colspan="5"> No results found. </hlm-td>
          </hlm-trow>
        }

        @for (post of postQuery.data()?.posts; track $index) {
          <hlm-trow class="border-secondary">
            <hlm-td class="w-16" truncate>{{ post.id }}</hlm-td>
            <hlm-td class="flex grow space-x-2">
              @for (tag of post.tags; track $index) {
                <span
                  class="text-muted-foreground"
                  hlmBadge
                  variant="outline"
                  >{{ tag }}</span
                >
              }
              <span>
                {{ post.title }}
              </span>
            </hlm-td>

            @if (columns().includes('views')) {
              <hlm-td class="w-24">
                <div class="flex items-center space-x-2">
                  <lucide-angular [img]="icons.Eye" />
                  <span>
                    {{ post.views }}
                  </span>
                </div>
              </hlm-td>
            }
            @if (columns().includes('likes')) {
              <hlm-td class="w-24">
                <div class="flex items-center space-x-2">
                  <lucide-angular [img]="icons.ThumbsUp" />
                  <span>
                    {{ post.reactions.likes }}
                  </span>
                </div>
              </hlm-td>
            }
            @if (columns().includes('dislikes')) {
              <hlm-td class="w-24">
                <div class="flex items-center space-x-2">
                  <lucide-angular [img]="icons.ThumbsDown" />
                  <span>
                    {{ post.reactions.dislikes }}
                  </span>
                </div>
              </hlm-td>
            }

            <hlm-td class="w-24">
              <div class="flex items-center space-x-2">
                @if (selectedPostId() === post.id) {
                  <button
                    hlmBtn
                    size="icon"
                    variant="ghost"
                    (click)="selectedPostId.set(null)"
                  >
                    <lucide-angular [img]="icons.CircleX" />
                  </button>
                } @else {
                  <button
                    hlmBtn
                    size="icon"
                    variant="ghost"
                    (click)="
                      showUser({
                        selectedIndex: $index,
                        selectedPostId: post.id,
                      })
                    "
                  >
                    <lucide-angular [img]="icons.User" />
                  </button>
                }
              </div>
            </hlm-td>
          </hlm-trow>

          @if (selectedIndex() === $index && selectedPostId() === post.id) {
            <app-posts-user [userId]="post.userId" />
          }
        }
      </hlm-table>

      @if (!term().length) {
        <div class="flex justify-end space-x-4">
          <button
            hlmBtn
            variant="ghost"
            [disabled]="page() === 1"
            (click)="page.set(page() - 1)"
          >
            Previous
          </button>

          @if (!!totalPagesArray().length) {
            <brn-select placeholder="Select page" [(ngModel)]="page">
              <hlm-select-trigger>
                <hlm-select-value />
              </hlm-select-trigger>
              <hlm-select-content>
                @for (pageNumber of totalPagesArray(); track pageNumber) {
                  <hlm-option [value]="pageNumber">{{ pageNumber }}</hlm-option>
                }
              </hlm-select-content>
            </brn-select>
          }

          <button
            hlmBtn
            variant="ghost"
            [disabled]="!postQuery.data()?.hasMore"
            (click)="page.set(page() + 1)"
          >
            Next
          </button>
        </div>
      }
    </div>
  `,
})
export class TaskComponent {
  readonly icons = lucideIcons;
  page = signal(1);
  selectedIndex = signal<null | number>(null);
  selectedPostId = signal<null | number>(null);
  #queryClient = injectQueryClient();

  postService = inject(PostService);

  #fb = inject(NonNullableFormBuilder);
  form = this.#fb.group({
    order: 'asc',
    sortBy: 'id',
    term: '',
  });

  columns = signal(['views', 'likes', 'dislikes']);
  order = toSignal(this.form.controls.order.valueChanges, {
    initialValue: 'asc',
  });
  sortBy = toSignal(this.form.controls.sortBy.valueChanges, {
    initialValue: 'id',
  });

  term = toSignal(
    this.form.controls.term.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  postQuery = injectQuery(() => ({
    queryFn: () =>
      this.postService.getPosts({
        page: this.term() ? 1 : this.page(),
        params: {
          order: this.order(),
          q: this.term(),
          sortBy: this.sortBy(),
        },
      }),
    queryKey: [
      queryKeys.GET_POSTS,
      this.page(),
      this.term(),
      this.sortBy(),
      this.order(),
    ],
  }));

  totalPagesArray = computed(() => {
    const totalPages = this.postQuery.data()?.totalPages ?? 0;

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  });

  cacheNextPageEffect = effect(() => {
    if (!this.postQuery.isPlaceholderData() && this.postQuery.data()?.hasMore) {
      this.#queryClient
        .prefetchQuery({
          queryFn: () =>
            this.postService.getPosts({
              page: this.page() + 1,
              params: {
                order: this.order(),
                q: this.term(),
                sortBy: this.sortBy(),
              },
            }),
          queryKey: [
            queryKeys.GET_POSTS,
            this.page() + 1,
            this.term(),
            this.sortBy(),
            this.order(),
          ],
        })
        .catch(() => toast.error('Failed to prefetch next page'));
    }
  });

  reset() {
    this.form.reset();
    this.page.set(1);
    this.columns.set(['views', 'likes', 'dislikes']);
  }

  showUser({
    selectedIndex,
    selectedPostId,
  }: {
    selectedIndex: number;
    selectedPostId: number;
  }) {
    this.selectedIndex.set(selectedIndex);
    this.selectedPostId.set(selectedPostId);
  }
}

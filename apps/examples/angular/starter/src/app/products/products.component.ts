import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertIconDirective,
  HlmAlertTitleDirective,
} from '@spartan-ng/ui-alert-helm';
import { HlmBadgeDirective } from '@spartan-ng/ui-badge-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmCardContentDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
} from '@spartan-ng/ui-card-helm';
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
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { LucideAngularModule } from 'lucide-angular';
import { toast } from 'ngx-sonner';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { AddProductComponent } from '~/components/product/add-product/add-product.component';
import { EditProductComponent } from '~/components/product/edit-product/edit-product.component';
import { ObserveVisibilityDirective } from '~/directives/observe-visibility.directive';
import { lucideIcons } from '~/icons/lucide';
import { ProductService } from '~/services/product.service';
import { queryKeys } from '~/services/queryKeys';

import { AppSignalStore } from '../app.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AddProductComponent,
    BrnSelectImports,
    CommonModule,
    EditProductComponent,
    FormsModule,
    HlmAlertDescriptionDirective,
    HlmAlertDirective,
    HlmAlertIconDirective,
    HlmAlertTitleDirective,
    HlmBadgeDirective,
    HlmButtonDirective,
    HlmCardContentDirective,
    HlmCardDirective,
    HlmCardFooterDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmInputDirective,
    HlmSelectImports,
    HlmSpinnerComponent,
    HlmTableComponent,
    HlmTdComponent,
    HlmThComponent,
    HlmTrowComponent,
    ObserveVisibilityDirective,
    ReactiveFormsModule,
    RouterModule,
    LucideAngularModule,
  ],
  selector: 'app-products',
  standalone: true,
  template: `
    <section class="flex w-full flex-col space-y-4">
      <section class="flex grow space-x-4">
        <form class="flex grow space-x-4" [formGroup]="productForm">
          <input
            class="grow bg-background"
            formControlName="term"
            hlmInput
            placeholder="Search for a product..."
          />
        </form>

        <button hlmBtn size="icon" (click)="reset()">
          <lucide-angular class="my-icon" [img]="icons.RotateCcw" />
        </button>

        <button hlmBtn size="icon" (click)="toggleViewMode()">
          @if (viewMode()) {
            <lucide-angular [img]="icons.List" />
          } @else {
            <lucide-angular [img]="icons.Grid2X2" />
          }
        </button>

        <component-add-product />

        @if (productId()) {
          <component-edit-product />
        }
      </section>

      @if (viewMode()) {
        <section class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          @for (product of infiniteProductQuery.data(); track product.id) {
            <article class="flex flex-col justify-between" hlmCard>
              <div class="flex flex-row items-center space-x-4" hlmCardHeader>
                <lucide-angular [img]="icons.PackageOpen" />

                <div class="flex grow flex-col space-y-1">
                  <p class="font-medium leading-6">
                    {{ product.title }}
                  </p>
                  <p class="text-sm text-muted-foreground" hlmCardTitle>
                    {{ product.brand }}
                  </p>
                </div>
                <button class="self-start" hlmBtn size="icon" variant="ghost">
                  <lucide-angular [img]="icons.Ellipsis" />
                </button>
              </div>
              <p class="text-muted-foreground" hlmCardContent>
                {{ product.description }}
              </p>

              <div
                class="flex justify-between border-t border-secondary p-4"
                hlmCardFooter
              >
                <div class="flex space-x-2">
                  @for (tag of product.tags; track tag) {
                    <span hlmBadge variant="outline">{{ tag }}</span>
                  }
                </div>

                <div class="flex space-x-2">
                  <button
                    hlmBtn
                    size="icon"
                    (click)="setCurrentProductId(product.id)"
                  >
                    <lucide-angular [img]="icons.Pencil" />
                  </button>

                  <a [routerLink]="['/products', product.id]">
                    <button hlmBtn size="icon">
                      <lucide-angular [img]="icons.Link" />
                    </button>
                  </a>
                </div>
              </div>
            </article>
          }
        </section>
      } @else {
        <hlm-table
          class="w-full rounded-md border border-secondary bg-background"
        >
          <hlm-trow>
            <hlm-th class="w-3/12">title</hlm-th>
            <hlm-th class="w-8/12">description</hlm-th>
            <hlm-th class="w-1/12">actions</hlm-th>
          </hlm-trow>

          @for (product of infiniteProductQuery.data(); track product.id) {
            <hlm-trow class="text-muted-foreground">
              <hlm-td class="w-3/12">{{ product.title }}</hlm-td>
              <hlm-td class="w-8/12">{{ product.description }}</hlm-td>
              <hlm-td class="w-1/12">
                <button
                  hlmBtn
                  size="icon"
                  (click)="setCurrentProductId(product.id)"
                >
                  <lucide-angular [img]="icons.Pencil" />
                </button>
              </hlm-td>
            </hlm-trow>
          }
        </hlm-table>
      }

      @if (term().length && infiniteProductQuery.isFetching()) {
        <div class="flex items-center">
          <hlm-spinner class="mr-2 h-4 w-4" />
          Searching...
        </div>
      }

      @if (!term().length && infiniteProductQuery.hasNextPage()) {
        <div
          appObserveVisibility
          class="flex items-center"
          (visible)="onVisibilityChange($event)"
        >
          <hlm-spinner class="mr-2 h-4 w-4" />
          Loading more...
        </div>
      }

      @if (!infiniteProductQuery.hasNextPage() && !term().length) {
        <div hlmAlert>
          <hlm-icon hlmAlertIcon name="lucideTriangleAlert" />
          <h4 hlmAlertTitle>
            End of products <link href="manifest.json" rel="manifest" />
          </h4>
          <p hlmAlertDesc>You have reached the end of the list</p>
        </div>
      }

      @if (infiniteProductQuery.data()?.length === 0) {
        <div hlmAlert>
          <hlm-icon hlmAlertIcon name="lucideTriangleAlert" />
          <h4 hlmAlertTitle>
            No results <link href="manifest.json" rel="manifest" />
          </h4>
          <p hlmAlertDesc>Try a different search term</p>
        </div>
      }
    </section>
  `,
})
export class ProductsComponent {
  readonly icons = lucideIcons;
  readonly store = inject(AppSignalStore);

  #formbuilder = inject(NonNullableFormBuilder);
  productForm = this.#formbuilder.group({ term: '' });
  productId = this.store.products.id;
  productService = inject(ProductService);
  viewMode = signal(true);

  term = toSignal(
    this.productForm.controls.term.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ),
    { initialValue: '' },
  );

  infiniteProductQuery = injectInfiniteQuery(() => ({
    getNextPageParam: (lastPage: { page: null | number }) => {
      return lastPage.page ? lastPage.page + 1 : null;
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      this.productService.getInfiniteProducts({
        page: pageParam,
        query: this.term(),
      }),
    queryKey: [queryKeys.INFINITE_PRODUCTS, this.term()],
    select: (data) => data.pages.flatMap((page) => page.products),
  }));

  onVisibilityChange(visible: boolean) {
    if (
      visible &&
      this.infiniteProductQuery.hasNextPage() &&
      !this.infiniteProductQuery.isFetchingNextPage()
    ) {
      this.infiniteProductQuery
        .fetchNextPage()
        .catch(() => toast.error('Failed to fetch next page'));
    }
  }

  reset() {
    this.productForm.reset();
  }

  setCurrentProductId(id: number) {
    this.store.setProductsId(id);
  }

  toggleViewMode() {
    this.viewMode.update((prev) => !prev);
  }
}

import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
  HlmTableComponent,
  HlmTdComponent,
  HlmThComponent,
  HlmTrowComponent,
} from '@spartan-ng/ui-table-helm';
import { HlmH3Directive } from '@spartan-ng/ui-typography-helm';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { truncate } from 'lodash-es';
import { LucideAngularModule } from 'lucide-angular';
import { toast } from 'ngx-sonner';

import { ObserveVisibilityDirective } from '~/directives/observe-visibility.directive';
import { lucideIcons } from '~/icons/lucide';
import { Product } from '~/interfaces/product.interface';
import { ProductService } from '~/services/product.service';
import { queryKeys } from '~/services/queryKeys';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ObserveVisibilityDirective,
    HlmSpinnerComponent,
    HlmTableComponent,
    HlmThComponent,
    CommonModule,
    HlmTdComponent,
    HlmTrowComponent,
    HlmButtonDirective,
    RouterLink,
    HlmH3Directive,
    HlmButtonDirective,
    LucideAngularModule,
  ],
  selector: 'app-dashboard-product-table',
  standalone: true,
  template: `
    <div class="space-y-4 rounded-md bg-background p-4">
      <div class="flex items-center justify-between space-x-4">
        <div class="flex flex-col space-y-2">
          <h3 hlmH3>Latest products</h3>
          <p class="text-xs">
            Scroll right to see more products. The table will load more products
            as you scroll.
          </p>
        </div>
      </div>
      <div class="flex items-start space-x-4 overflow-auto">
        @for (page of infiniteProductQuery.data()?.pages; track page.page) {
          <hlm-table
            class="w-full shrink-0 border border-secondary bg-background 2xl:w-1/2"
          >
            <hlm-trow>
              <hlm-th class="w-3/12">Title</hlm-th>
              <hlm-th class="w-8/12">description</hlm-th>
            </hlm-trow>

            @for (product of page?.products; track product.id) {
              <hlm-trow>
                <hlm-td class="w-3/12">
                  {{ product.title }}
                </hlm-td>
                <hlm-td class="w-7/12 lg:w-8/12">
                  {{ summarize(product.description) }}
                </hlm-td>
                <hlm-td class="w-2/12 lg:w-1/12">
                  <a [routerLink]="['products', product.id]">
                    <button hlmBtn size="icon" variant="ghost">
                      <lucide-angular [img]="icons.Link" />
                    </button>
                  </a>
                </hlm-td>
              </hlm-trow>
            }
          </hlm-table>
        }

        @if (infiniteProductQuery.hasNextPage()) {
          <div appObserveVisibility (visible)="onVisibilityChange($event)">
            <hlm-spinner class="mr-2 h-4 w-4" />
          </div>
        }
      </div>
    </div>
  `,
})
export class ProductTableComponent {
  readonly icons = lucideIcons;
  productService = inject(ProductService);
  infiniteProductQuery = injectInfiniteQuery(() => ({
    getNextPageParam: (lastPage: { page: null | number }) =>
      lastPage.page ? lastPage.page + 1 : null,
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      this.productService.getInfiniteProducts({
        limit: 5,
        page: pageParam,
      }),
    queryKey: [queryKeys.INFINITE_PRODUCTS, 'Dashboard'],
  }));

  products: Product[] = [];

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

  summarize(description: string) {
    return truncate(description, { length: 80 });
  }
}

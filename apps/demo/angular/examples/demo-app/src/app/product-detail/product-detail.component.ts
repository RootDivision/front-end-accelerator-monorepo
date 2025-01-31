import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { ProductService } from '~/services/product.service';
import { queryKeys } from '~/services/queryKeys';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-product-detail',
  standalone: true,
  template: `
    <div class="flex flex-col space-y-2">
      <h1>
        {{ productQuery.data()?.title }}
      </h1>
      <p>
        {{ productQuery.data()?.description }}
      </p>
    </div>
  `,
})
export class ProductDetailComponent {
  id = input.required<number>();
  productService = inject(ProductService);

  productQuery = injectQuery(() => ({
    enabled: !!this.id(),
    queryFn: () => this.productService.getProductById(this.id()),
    queryKey: [queryKeys.GET_PRODUCT, this.id()],
  }));
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { provideIcons } from '@ng-icons/core';
import { lucidePencil } from '@ng-icons/lucide';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  HlmFormFieldComponent,
  HlmFormFieldModule,
} from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
  injectMutation,
  injectQuery,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { toast } from 'ngx-sonner';

import { AppSignalStore } from '~/app/app.store';
import { ProductService } from '~/services/product.service';
import { queryKeys } from '~/services/queryKeys';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HlmButtonDirective,
    HlmInputDirective,
    HlmLabelDirective,
    HlmFormFieldComponent,
    HlmFormFieldModule,
    BrnSeparatorComponent,
    HlmSeparatorDirective,
    HlmSpinnerComponent,
  ],
  providers: [
    provideIcons({
      lucidePencil,
    }),
  ],
  selector: 'component-edit-product',
  standalone: true,
  template: `
    <div
      class="z-49 fixed right-0 top-0 h-full w-full bg-background opacity-70"
      tabindex="0"
      (click)="close()"
      (keydown.esc)="close()"
    ></div>

    <div
      class="fixed right-0 top-0 z-50 h-full w-96 border-l border-gray-100 border-secondary bg-background p-4"
    >
      <form
        class="flex flex-col space-y-4"
        [formGroup]="productForm"
        (submit)="onSubmit()"
      >
        <h3>Edit product</h3>
        <brn-separator decorative hlmSeparator />
        <hlm-form-field>
          <label for="title" hlmLabel>Title</label>
          <input
            class="w-full"
            formControlName="title"
            hlmInput
            id="title"
            value="{{ productQuery.data()?.title }}"
          />
        </hlm-form-field>
        <hlm-form-field>
          <label for="price" hlmLabel>Price</label>
          <input
            class="w-full"
            formControlName="price"
            hlmInput
            id="price"
            type="number"
            value="{{ productQuery.data()?.price }}"
          />
        </hlm-form-field>

        <div class="flex justify-end space-x-4">
          <button hlmBtn type="button" variant="secondary" (click)="close()">
            Cancel
          </button>

          <button
            hlmBtn
            type="submit"
            [disabled]="!productForm.valid || editProduct.isPending()"
          >
            @if (editProduct.isPending()) {
              <hlm-spinner class="mr-4 h-4 w-4" />
            }

            Save Changes
          </button>
        </div>
      </form>
    </div>
  `,
})
export class EditProductComponent {
  queryClient = inject(QueryClient);
  readonly store = inject(AppSignalStore);

  productForm = new FormGroup({
    id: new FormControl(0),
    price: new FormControl(0),
    title: new FormControl(''),
  });
  productService = inject(ProductService);

  productQuery = injectQuery(() => ({
    enabled: !!this.store.products.id(),
    queryFn: () =>
      this.productService.getProductById(this.store.products.id()!),
    queryKey: [queryKeys.GET_PRODUCT, this.store.products.id()],
  }));

  formPatchEffect = effect(() => {
    if (this.productQuery.isSuccess()) {
      const product = this.productQuery.data();
      this.productForm.patchValue({
        id: product.id,
        price: product.price,
        title: product.title,
      });
    }
  });

  editProduct = injectMutation(() => ({
    mutationFn: (data: FormGroup) => this.productService.updateProduct(data),
    onError: () => toast.error('Error updating product'),
    onSuccess: async (res) => {
      toast.success('Product updated', {
        description: `${res.title} has been updated`,
      });
      await this.queryClient.invalidateQueries({
        queryKey: [queryKeys.INFINITE_PRODUCTS],
      });
      this.productForm.reset();
      this.close();
    },
  }));

  close() {
    this.store.setProductsId(null);
  }

  onSubmit() {
    this.editProduct.mutate(this.productForm);
  }
}

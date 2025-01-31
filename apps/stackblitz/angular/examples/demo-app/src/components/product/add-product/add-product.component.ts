import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnDialogContentDirective,
  BrnDialogTriggerDirective,
} from '@spartan-ng/ui-dialog-brain';
import {
  HlmDialogComponent,
  HlmDialogContentComponent,
  HlmDialogDescriptionDirective,
  HlmDialogFooterComponent,
  HlmDialogHeaderComponent,
  HlmDialogTitleDirective,
} from '@spartan-ng/ui-dialog-helm';
import { HlmFormFieldModule } from '@spartan-ng/ui-formfield-helm';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { BrnSeparatorComponent } from '@spartan-ng/ui-separator-brain';
import { HlmSeparatorDirective } from '@spartan-ng/ui-separator-helm';
import { HlmSpinnerComponent } from '@spartan-ng/ui-spinner-helm';
import {
  injectMutation,
  QueryClient,
} from '@tanstack/angular-query-experimental';
import { toast } from 'ngx-sonner';

import { ProductService } from '~/services/product.service';
import { queryKeys } from '~/services/queryKeys';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    BrnDialogTriggerDirective,
    BrnDialogContentDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogHeaderComponent,
    HlmDialogFooterComponent,
    HlmDialogTitleDirective,
    HlmDialogDescriptionDirective,
    HlmLabelDirective,
    HlmInputDirective,
    HlmButtonDirective,
    HlmFormFieldModule,
    BrnSeparatorComponent,
    HlmSeparatorDirective,
    HlmSpinnerComponent,
  ],
  selector: 'component-add-product',
  standalone: true,
  template: `
    <hlm-dialog (closed)="productForm.reset()">
      <button brnDialogTrigger hlmBtn>Add new item</button>
      <hlm-dialog-content *brnDialogContent="let ctx">
        <form
          class="flex flex-col space-y-4"
          [formGroup]="productForm"
          (ngSubmit)="onSubmit(ctx)"
        >
          <hlm-dialog-header>
            <h3 hlmDialogTitle>Add new product</h3>
            <p hlmDialogDescription>
              The added product will not be saved. This returns a mock product.
            </p>
          </hlm-dialog-header>
          <brn-separator hlmSeparator />
          <div class="flex flex-col space-y-2">
            <hlm-form-field>
              <label class="text-right" for="title" hlmLabel>Title</label>
              <input
                class="w-full"
                formControlName="title"
                hlmInput
                id="title"
                placeholder="Enter product title"
                type="text"
              />
            </hlm-form-field>

            <hlm-form-field>
              <label class="text-right" for="price" hlmLabel>Price</label>
              <input
                class="w-full"
                formControlName="price"
                hlmInput
                id="price"
                type="number"
              />
            </hlm-form-field>

            <hlm-form-field>
              <label class="text-right" for="description" hlmLabel
                >Description</label
              >
              <input
                class="w-full"
                formControlName="description"
                hlmInput
                id="description"
                placeholder="Enter product description"
                type="text"
              />
              @if (description?.invalid && description?.touched) {
                <p class="text-sm italic text-red-500">
                  Description is required
                </p>
              }
            </hlm-form-field>
          </div>

          <hlm-dialog-footer>
            <button hlmBtn type="submit" [disabled]="!productForm.valid">
              @if (addProduct.isPending()) {
                <hlm-spinner class="mr-4 h-4 w-4" />
              }

              Save changes
            </button>
          </hlm-dialog-footer>
        </form>
      </hlm-dialog-content>
    </hlm-dialog>
  `,
})
export class AddProductComponent {
  productForm = new FormGroup({
    description: new FormControl('', [
      (control) => Validators.required(control),
    ]),
    price: new FormControl(0),
    title: new FormControl('', [(control) => Validators.required(control)]),
  });
  productService = inject(ProductService);
  queryClient = inject(QueryClient);

  addProduct = injectMutation(() => ({
    mutationFn: (data: FormGroup) => this.productService.addProduct(data),
    onError: () => toast.error('Error creating product'),
    onSuccess: async (res) => {
      toast.success('Product created', {
        description: `${res.title} has been added to the list`,
      });
      await this.queryClient.invalidateQueries({
        queryKey: [queryKeys.INFINITE_PRODUCTS],
      });
      this.productForm.reset();
    },
  }));

  onSubmit(ctx: { close: () => void }) {
    ctx.close();
    this.addProduct.mutate(this.productForm);
  }

  get description() {
    return this.productForm.get('description');
  }
}

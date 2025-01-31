import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import {
  InfiniteProductResponse,
  Product,
  ProductResponse,
} from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  http = inject(HttpClient);
  private url = 'https://dummyjson.com/products';

  addProduct(formGroup: FormGroup): Promise<Product> {
    const product = lastValueFrom(
      this.http.post<Product>(`${this.url}/add`, formGroup.value),
    );

    return product;
  }

  async getInfiniteProducts({
    limit = 20,
    page = 1,
    query = '',
  }: {
    limit?: number;
    page?: number;
    query?: string;
  }): Promise<InfiniteProductResponse> {
    const urlParams = new URLSearchParams({
      limit: `${limit}`,
      q: query,
      skip: `${(page - 1) * limit}`,
    });

    const { products, skip, total } = await lastValueFrom(
      this.http.get<ProductResponse>(`${this.url}/search?${urlParams}`),
    );

    const paginatedResponse = {
      page: skip < total ? page : null,
      products,
      totalPages: Math.ceil(total / limit),
    };

    return paginatedResponse;
  }

  getProductById(id: number): Promise<Product> {
    return lastValueFrom(this.http.get<Product>(`${this.url}/${id}`));
  }

  updateProduct(formGroup: FormGroup): Promise<Product> {
    const { id, ...data } = formGroup.value as {
      id: number;
      price: number;
      title: string;
    };

    return lastValueFrom(this.http.put<Product>(`${this.url}/${id}`, data));
  }
}

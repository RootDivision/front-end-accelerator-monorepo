import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { PaginatedPostResponse } from '../interfaces/post.interface';

@Injectable({ providedIn: 'root' })
export class PostService {
  private http = inject(HttpClient);
  private url = 'https://dummyjson.com/posts';

  async getPosts({
    page,
    params,
  }: {
    page: number;
    params: {
      order: string;
      q: string;
      sortBy: string;
    };
  }) {
    const limit = 10;

    const response = await lastValueFrom(
      this.http.get<PaginatedPostResponse>(
        `${this.url}/search`,
        {
          params: {
            ...params,
            limit: `${limit}`,
            skip: `${(page - 1) * limit}`,
          },
        },
      ),
    );

    const paginatedResponse = {
      ...response,
      hasMore: response.posts.length === limit,
      totalPages: Math.ceil(response.total / limit),
    };

    return paginatedResponse;
  }
}

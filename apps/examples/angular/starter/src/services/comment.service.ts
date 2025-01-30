import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { CommentResponse } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  http = inject(HttpClient);

  private url = 'https://dummyjson.com/comments';

  getComments(): Promise<CommentResponse> {
    return lastValueFrom(this.http.get<CommentResponse>(`${this.url}`));
  }
}

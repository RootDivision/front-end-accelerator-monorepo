import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import { TodoResponse } from '../interfaces/todo.interface';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private http = inject(HttpClient);
  private url = 'https://dummyjson.com/todos';

  getTodos(): Promise<TodoResponse> {
    return lastValueFrom(this.http.get<TodoResponse>(`${this.url}`));
  }
}

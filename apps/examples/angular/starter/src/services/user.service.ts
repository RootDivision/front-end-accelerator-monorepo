import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

import { User, UsersResponse } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  private url = 'https://dummyjson.com/users';

  getUser(id: number): Promise<User> {
    return lastValueFrom(this.http.get<User>(`${this.url}/${id}`));
  }

  getUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.url}`);
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { HlmCardDirective } from '@spartan-ng/ui-card-helm';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { queryKeys } from '~/services/queryKeys';
import { UserService } from '~/services/user.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, HlmCardDirective, HlmCardDirective],
  providers: [],
  selector: 'app-posts-user',
  standalone: true,
  template: ` @if (user.data()) {
    <div class="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
      <section class="col-span-2 p-4" hlmCard>
        <img
          alt="user id"
          class="h-48 w-full object-contain"
          [src]="user.data()?.image"
        />
      </section>

      <section class="p-4" hlmCard>
        <h3 class="mb-2 text-xl font-bold">
          {{ user.data()?.firstName }} {{ user.data()?.lastName }}
        </h3>
        <ul class="text-gray-700">
          <li><strong>Username:</strong> {{ user.data()?.username }}</li>
          <li><strong>Email:</strong> {{ user.data()?.email }}</li>
          <li><strong>Phone:</strong> {{ user.data()?.phone }}</li>
          <li><strong>Gender:</strong> {{ user.data()?.gender }}</li>
          <li><strong>Age:</strong> {{ user.data()?.age }}</li>
          <li>
            <strong>Birth Date:</strong> {{ user.data()?.birthDate | date }}
          </li>
          <li><strong>Blood Group:</strong> {{ user.data()?.bloodGroup }}</li>
          <li><strong>Height:</strong> {{ user.data()?.height }} cm</li>
          <li><strong>Weight:</strong> {{ user.data()?.weight }} kg</li>
        </ul>
      </section>

      <section class="p-4" hlmCard>
        <h3 class="mb-2 text-xl font-bold">Other information</h3>
        <ul class="text-gray-700">
          <li><strong>Eye Color:</strong> {{ user.data()?.eyeColor }}</li>
          <li><strong>Hair Color:</strong> {{ user.data()?.hair?.color }}</li>
          <li><strong>Hair Type:</strong> {{ user.data()?.hair?.type }}</li>
          <li>
            <strong>Address:</strong> {{ user.data()?.address?.address }},
            {{ user.data()?.address?.city }}, {{ user.data()?.address?.state }}
            {{ user.data()?.address?.postalCode }},
            {{ user.data()?.address?.country }}
          </li>
          <li><strong>University:</strong> {{ user.data()?.university }}</li>
          <li><strong>Company:</strong> {{ user.data()?.company?.name }}</li>
          <li>
            <strong>Department:</strong> {{ user.data()?.company?.department }}
          </li>
          <li><strong>Title:</strong> {{ user.data()?.company?.title }}</li>
        </ul>
      </section>

      <section class="col-span-2 p-4" hlmCard>
        <img
          alt="user id"
          class="h-52 w-full object-cover"
          src="https://learn.microsoft.com/en-us/azure/azure-maps/media/migrate-google-maps-web-app/google-maps-marker.png"
        />
      </section>
    </div>
  }`,
})
export class PostsUserComponent {
  userId = input<number>(0);
  userService = inject(UserService);

  user = injectQuery(() => ({
    enabled: !!this.userId,
    queryFn: () => this.userService.getUser(this.userId()),
    queryKey: [queryKeys.GET_USER, this.userId()],
  }));
}

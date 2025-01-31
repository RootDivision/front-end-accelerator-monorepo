import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <h1>{{ this.title }}</h1>`,
})
export class AppComponent {
  title = '01-angular-hello-world';
}

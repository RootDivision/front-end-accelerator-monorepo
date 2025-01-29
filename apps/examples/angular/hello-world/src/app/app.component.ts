import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  template: `<h1>hello world Angular</h1>`,
})
export class AppComponent {
  title = 'hello-world';
}

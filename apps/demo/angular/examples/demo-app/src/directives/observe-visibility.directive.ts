import {
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appObserveVisibility]',
  standalone: true,
})
export class ObserveVisibilityDirective implements OnDestroy, OnInit {
  @Input() debounceTime = 0;
  elementRef = inject(ElementRef);
  @Input() threshold = 0.1;

  @Output() visible = new EventEmitter<boolean>();

  private observer: IntersectionObserver | undefined;

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  ngOnInit() {
    this.createObserver();
  }

  private createObserver() {
    const options = {
      root: null,
      threshold: this.threshold,
    };

    if (typeof window !== 'undefined') {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.visible.emit(true);
          } else {
            this.visible.emit(false);
          }
        });
      }, options);

      this.observer.observe(this.elementRef.nativeElement as Element);
    }
  }
}

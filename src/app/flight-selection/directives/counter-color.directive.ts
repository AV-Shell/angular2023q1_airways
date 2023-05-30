import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCounterColor]',
})
export class CounterColorDirective implements OnInit {
  @Input() count?: number;
  @Input() styleName?: string;

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {}

  ngOnInit() {
    if (this.count) {
      let color = '#7f89064d';
      color = this.count <= 100 ? '#f1c9334d' : color;
      color = this.count <= 20 ? '#b3261e4d' : color;

      this.renderer2.setStyle(this.elementRef.nativeElement, this?.styleName ?? '', color);
    }
  }
}

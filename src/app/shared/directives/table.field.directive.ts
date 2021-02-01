import { ElementRef, Input } from '@angular/core';
import { Directive,} from '@angular/core'

@Directive({
    selector: '[tableField]'
})
export class TableFieldDirective {
  private el: ElementRef;

  @Input('tableField') option: any;

  constructor(el:ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    this.el.nativeElement.innerText = 'yellow';
  }

  ngAfterViewInit(): void {
  }
}

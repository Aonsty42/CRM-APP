import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil} from 'rxjs/operators'

import { ProgressbarService } from './progressbar.service'
@Component({
  selector: 'app-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.scss']
})
export class ProgressbarComponent implements OnInit, OnDestroy {
  bufferValue: number;
  mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  value: number;
  visible: boolean;

  private unsubscribeAll: Subject<any>;

  constructor(private progressbarService: ProgressbarService) {

    this.unsubscribeAll = new Subject();
  }

  ngOnInit(): void {

    this.progressbarService.bufferValue
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((bufferValue) => {
      this.bufferValue = bufferValue;
    });

  // Mode
  this.progressbarService.mode
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((mode) => {
      this.mode = mode;
    });

  // Value
  this.progressbarService.value
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((value) => {
      this.value = value;
    });

  // Visible
  this.progressbarService.visible
    .pipe(takeUntil(this.unsubscribeAll))
    .subscribe((visible) => {
      this.visible = visible;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}

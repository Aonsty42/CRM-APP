import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map,startWith, takeUntil } from 'rxjs/operators';
import { FormbaseService } from '../../services/formbase.service';
import { Formbase } from './formbase';

@Component({
  selector: 'app-formbase',
  templateUrl: './formbase.component.html',

})
export class FormbaseComponent {
  @Input() control: Formbase<string>;
  @Input() form: FormGroup;

  today = new Date();
  private _unsubscribeAll: Subject<any>;
  filteredOptions: Observable<any[]>;

  constructor(private formBaseService: FormbaseService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    if (this.control.controlType === 'lookup') {
      this.formBaseService.lovGetheredObservable$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((lovData) => {
          if (this.control.key === lovData.key) {
            this.control.options = lovData.data;
          }
        });
    };

    if (this.control.controlType === 'multiselect' && this.control.lov && this.control.lov !== '') {
      this.formBaseService.lovGetheredObservable$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((lovData) => {
          if (this.control.key === lovData.key) {
            this.control.options = lovData.data;
          }
        });
    };

    this.filteredOptions = this.form.controls[this.control.key].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return [];
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getValue(key: string) {
    return this.control.options?.find(option => option.key === key)?.value;
  }

}

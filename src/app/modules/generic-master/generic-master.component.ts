import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Formbase } from 'src/app/shared/component/formbase/formbase';
import { FormbaseService } from 'src/app/shared/services/formbase.service';
import { GenericMasterService } from './generic-master.service';

@Component({
  selector: 'app-generic-master',
  templateUrl: './generic-master.component.html',
  styleUrls: ['./generic-master.component.scss']
})
export class GenericMasterComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer: MatSidenav;
  formBase: Formbase<string>[] = [];
  form: FormGroup;
  layout: any
  search = '';

  private _unsubscribeAll: Subject<any>;

  constructor(private formBaseService: FormbaseService, public genericMasterService: GenericMasterService, private router: Router) {
    this._unsubscribeAll = new Subject();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.genericMasterService.layoutChangedObservable$
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((layouts) => {
        console.log(layouts);
        if (layouts && layouts.length > 0){
          this.layout = layouts[0];
          this.formBase = this.layout?.forms || [];
          this.form = this.formBaseService.toFormGroup(this.formBase);
        }
      })
  }

  onAddNew(): void {
    this.formBase = this.layout.forms ? this.layout.forms : [];
    this.form = this.formBaseService.toFormGroup(this.formBase);
    this.drawer.toggle();
  }

  onEdit(row): void {
    // console.log(row);
    this.genericMasterService.getDataByID(this.layout.apiUrl, row.id)
      .subscribe((data) => {
        this.formBase = this.layout.forms ? this.layout.forms : [];
        this.form = this.formBaseService.toFormGroup(this.formBase, data);
        this.drawer.toggle();
      });

  }

  onSubmit(): void {
    const payLoad = this.form.getRawValue();

    const id = payLoad.id;
    if (payLoad) {
      this.genericMasterService.updateData(this.layout.apiUrl, payLoad).subscribe(recsult => {
        if (this.layout.haveDetail) {
          if (id) {
            this.drawer.toggle();
          } else {
            this.drawer.toggle();
            // this.router.navigateByUrl(`${this.layout.key}/${recsult.id}`);
          }

        } else {
          this.drawer.toggle();
        }
      })
    }
  }

  onDelete(row): void {
    this.genericMasterService.deleteData(this.layout.apiUrl, row.id);

  }

  onDetail(row): void {
    this.router.navigateByUrl(`${this.layout.key}/${row.id}`);
  }

}

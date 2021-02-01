import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Location} from '@angular/common'
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Formbase } from 'src/app/shared/component/formbase/formbase';
import { FormbaseService } from 'src/app/shared/services/formbase.service';
import { GenericDetailService } from './generic-detail.service';

@Component({
  selector: 'app-generic-detail',
  templateUrl: './generic-detail.component.html',
  styleUrls: ['./generic-detail.component.scss']
})
export class GenericDetailComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer: MatSidenav;
  formBase: Formbase<string>[] = [];
  form: FormGroup;
  layouts$: Observable<any[]>;
  layouts: any[];
  layout: any;
  search = '';

  private _unsubscribeAll: Subject<any>;

  constructor(private formBaseService: FormbaseService, public genericDetailService: GenericDetailService, private router: Router,private location: Location) {
    this._unsubscribeAll = new Subject();
   }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.genericDetailService.layoutChangedObservable$
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((layouts) => {
        this.layouts = layouts;
        if(layouts && layouts.length > 0) {
          this.selectChanged(0);
        }
      })
  }

  selectChanged(index: number): void {
    this.layout = this.layouts[index];
    this.formBase = this.layout?.forms || [];
    this.formBase.forEach(ctl => {
      if (this.genericDetailService.lookupFields.includes(ctl.key)) {
        ctl.value = this. genericDetailService.relateId;
        ctl.controlType = null;
      }
    })
    this.form = this.formBaseService.toFormGroup(this.formBase);

    this.genericDetailService.getListData(this.layout.apiUrl);
  }

  tabChanged(event): void {
    this.selectChanged(event.index);
  }

  onAddNew(): void {
    this.formBase = this.layout.forms ? this.layout.forms : [];
    this.form = this.formBaseService.toFormGroup(this.formBase);
    this.drawer.toggle();

  }

  onEdit(row): void {
    // console.log(row);
    this.genericDetailService.getDataByID(this.layout.apiUrl, row.id)
      .subscribe((data) => {
        this.formBase = this.layout.forms ? this.layout.forms : [];
        this.form = this.formBaseService.toFormGroup(this.formBase, data);
        this.drawer.toggle();
      });

  }

  onClone(row): void {
    this.genericDetailService.getDataByID(this.layout.apiUrl, row.id)
      .subscribe((data) => {
        this.formBase = this.layout.forms ? this.layout.forms : [];
        data.id = "";
        this.form = this.formBaseService.toFormGroup(this.formBase, data);
        this.drawer.toggle();
      });
  }

  onSubmit(): void {
    const payLoad = this.form.getRawValue();

    const id = payLoad.id;
    if (payLoad) {
      this.genericDetailService.updateData(this.layout.apiUrl, payLoad).subscribe(recsult => {
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
    this.genericDetailService.deleteData(this.layout.apiUrl, row.id);
  }

  onDetail(row): void {
    if (this.layout.haveDetail) {
      this.router.navigateByUrl(`${this.layout.key}/${row.id}`);
    } else {
      this.onEdit(row);
    }

  }

  goBack(): void {
    this.location.back();
  }

}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Formbase } from './formbase';
import { FormbaseService } from '../../services/formbase.service';
import { map, takeUntil } from 'rxjs/operators';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tablebase',
  templateUrl: './tablebase.component.html'
})
export class TablebaseComponent implements OnChanges {
  @Input() dataSource: any;
  @Input() table: any;

  tableDataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Output() onDetailRow: EventEmitter<any> = new EventEmitter();
  @Output() onEditRow: EventEmitter<any> = new EventEmitter();
  @Output() onCloneRow: EventEmitter<any> = new EventEmitter();
  @Output() onDeleteRow: EventEmitter<any> = new EventEmitter();
  @Output() onPageEventChanged: EventEmitter<any> = new EventEmitter();
  private _unsubscribeAll: Subject<any>;

  constructor(private formBaseService: FormbaseService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.tableDataSource = new MatTableDataSource(this.dataSource);
    this.tableDataSource.paginator = this.paginator;
  }

  // ngOnInit(): void {
  //   this.formBaseService.lovGetheredObservable$
  //     .pipe(takeUntil(this._unsubscribeAll))
  //     .subscribe((lovData) => {
  //       console.log(this.table.columns);
  //       this.table.columns.foEach(column => {
  //         if (column.key === lovData.key) {
  //           column.options = lovData.data;
  //         }
  //       });
  //     });
  // }

  ngOnInit(): void {
    this.formBaseService.lovGetheredObservable$
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((lovData) => {
            this.table.columns.forEach(column => {
                if (column.key === lovData.key) {
                    column.options = lovData.data;
                }
            });
        });
}

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onDetail(row): void {
    this.onDetailRow.emit(row);
}

onEdit(row): void {
    this.onEditRow.emit(row);
}

onClone(row): void {
    this.onCloneRow.emit(row);
}

onDelete(row): void {
    this.onDeleteRow.emit(row);
}

onPageEvent($event): void {
    this.onPageEventChanged.emit($event);
}
}

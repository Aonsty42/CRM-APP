import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';
import { FusePerfectScrollbarDirective } from 'src/app/shared/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { Card } from '../../card.model';
import { ScrumbordService } from '../../scrumbord.service';
import { ScrumboardCardDialogComponent } from '../dialogs/card/card.component';

@Component({
  selector: 'scrumboard-board-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit, OnDestroy {


  board: any;
  dialogRef: any;

  @Input()
  list;

  @ViewChild(FusePerfectScrollbarDirective)
  listScoll: FusePerfectScrollbarDirective;

  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  private _unsubscribeAll: Subject<any>;
  constructor(private _activatedRoute: ActivatedRoute,
    private _scrumboardService: ScrumbordService,
    private _matDialog: MatDialog) {
    this._unsubscribeAll = new Subject();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {

    this._scrumboardService.onBoardChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(board => {
        this.board = board;
      });
  }

  onListNameChanged(newListName): void {
    this.list.name = newListName;
  }

  onCardAdd(newCardName): void {
    if (newCardName === '') {
      return;
    }

    this._scrumboardService.addCard(this.list.id, new Card({ name: newCardName }));

    setTimeout(() => {
      this.listScoll.scrollToBottom(0, 400);
    });
  }

  removeList(listId): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete the list and it\'s all cards?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._scrumboardService.removeList(listId);
      }
    });
  }

  openCardDialog(cardId): void {
    this.dialogRef = this._matDialog.open(ScrumboardCardDialogComponent, {
      panelClass: 'scrumboard-card-dialog',
      data: {
        cardId: cardId,
        listId: this.list.id
      }
    });
    this.dialogRef.afterClosed()
      .subscribe(response => {

      });
  }
  onDrop(ev): void {
    this._scrumboardService.updateBoard();
  }


}

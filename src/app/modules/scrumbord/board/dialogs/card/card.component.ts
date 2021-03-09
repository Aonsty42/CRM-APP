import { Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';
import { Utils } from 'src/app/shared/utils';
import { ScrumbordService } from 'src/app/modules/scrumbord/scrumbord.service';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'scrumboard-board-card-dialog',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScrumboardCardDialogComponent implements OnInit, OnDestroy {

  card: any;
  board: any;
  list: any;

  toggleInArray = Utils.toggleInArray;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>;

  @ViewChild('checklistMenuTrigger')
  checklistMenu: MatMenuTrigger;

  @ViewChild('newCheckListTitleField')
  newCheckListTitleField;

  private _unsubscribeAll: Subject<any>;

  constructor(public matDialogRef: MatDialogRef<ScrumboardCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _matDialog: MatDialog,
    private _scrumboardService: ScrumbordService) {
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

        this.card = this.board.cards.find((_card) => {
          return this._data.cardId === _card.id;
        });

        this.list = this.board.lists.find((_list) => {
          return this._data.listId === _list.id;
        });
      });
  }
  removeDueDate(): void {
    this.card.due = '';
    this.updateCard();
  }
  toggleSubscribe(): void {
    this.card.subscribed = !this.card.subscribed;

    this.updateCard();
  }

  toggleCoverImage(attachmentId): void {
    if (this.card.idAttachmentCover === attachmentId) {
      this.card.idAttachmentCover = '';
    }
    else {
      this.card.idAttachmentCover = attachmentId;
    }

    this.updateCard();
  }
  removeAttachment(attachment): void {
    if (attachment.id === this.card.idAttachmentCover) {
      this.card.idAttachmentCover = '';
    }

    this.card.attachments.splice(this.card.attachments.indexOf(attachment), 1);

    this.updateCard();
  }
  removeChecklist(checklist): void {
    this.card.checklists.splice(this.card.checklists.indexOf(checklist), 1);

    this.updateCard();
  }
  updateCheckedCount(list): void {
    const checkItems = list.checkItems;
    let checkedItems = 0;
    let allCheckedItems = 0;
    let allCheckItems = 0;

    for (const checkItem of checkItems) {
      if (checkItem.checked) {
        checkedItems++;
      }
    }

    list.checkItemsChecked = checkedItems;

    for (const item of this.card.checklists) {
      allCheckItems += item.checkItems.length;
      allCheckedItems += item.checkItemsChecked;
    }

    this.card.checkItems = allCheckItems;
    this.card.checkItemsChecked = allCheckedItems;

    this.updateCard();
  }

  removeChecklistItem(checkItem, checklist): void {
    checklist.checkItems.splice(checklist.checkItems.indexOf(checkItem), 1);

    this.updateCheckedCount(checklist);

    this.updateCard();
  }

  addCheckItem(form: NgForm, checkList): void {
    const checkItemVal = form.value.checkItem;

    if (!checkItemVal || checkItemVal === '') {
      return;
    }

    const newCheckItem = {
      'name': checkItemVal,
      'checked': false
    };

    checkList.checkItems.push(newCheckItem);

    this.updateCheckedCount(checkList);

    form.setValue({ checkItem: '' });

    this.updateCard();
  }
  addChecklist(form: NgForm): void {
    this.card.checklists.push({
      id: Utils.generateGUID(),
      name: form.value.checklistTitle,
      checkItemsChecked: 0,
      checkItems: []
    });

    form.setValue({ checklistTitle: '' });
    form.resetForm();
    this.checklistMenu.closeMenu();
    this.updateCard();
  }
  onChecklistMenuOpen(): void {
    setTimeout(() => {
      this.newCheckListTitleField.nativeElement.focus();
    });
  }
  addNewComment(form: NgForm): void {
    const newCommentText = form.value.newComment;

    const newComment = {
      idMember: '36027j1930450d8bf7b10158',
      message: newCommentText,
      time: 'now'
    };

    this.card.comments.unshift(newComment);

    form.setValue({ newComment: '' });

    this.updateCard();
  }
  removeCard(): void {
    this.confirmDialogRef = this._matDialog.open(ConfirmDialogComponent, {
      disableClose: false
    });

    this.confirmDialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete the card?';

    this.confirmDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.matDialogRef.close();
        this._scrumboardService.removeCard(this.card.id, this.list.id);
      }
    });
  }
  updateCard(): void {
    this._scrumboardService.updateCard(this.card);
  }


}

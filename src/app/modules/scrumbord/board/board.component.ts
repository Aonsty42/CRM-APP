import { Location } from '@angular/common';
import { viewClassName } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Animations } from 'src/app/shared/animations';
import { ScrumbordService } from '../scrumbord.service';

import { List } from 'src/app/modules/scrumbord/list.model'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Animations
})
export class BoardComponent implements OnInit, OnDestroy {

  board: any;

  private _unsubscribeAll: Subject<any>;


  constructor(private activatedRoute: ActivatedRoute, private location: Location, private scrumboardService: ScrumbordService) {
    this._unsubscribeAll = new Subject();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.scrumboardService.onBoardChanged.pipe(takeUntil(this._unsubscribeAll))
      .subscribe(board => {
        this.board = board;
      });
  }

  onListAdd(newListName): void {
    if (newListName === '') {
      return;
    }

    this.scrumboardService.addList(new List({ name: newListName }));
  }

  onBoardNameChanged(newName): void {
    this.scrumboardService.updateBoard();
    this.location.go('/apps/scrumboard/boards/' + this.board.id + '/' + this.board.uri);
  }

  onDrop(ev): void {
    this.scrumboardService.updateBoard();
  }

}

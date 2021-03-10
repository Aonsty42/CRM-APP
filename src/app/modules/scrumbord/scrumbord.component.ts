import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Animations } from 'src/app/shared/animations';
import { ScrumbordService } from './scrumbord.service';
import { Board } from './board.model'


@Component({
  selector: 'scrumbord',
  templateUrl: './scrumbord.component.html',
  styleUrls: ['./scrumbord.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: Animations
})
export class ScrumbordComponent implements OnInit, OnDestroy {

  boards: any[];

  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router, private _scrumboardService: ScrumbordService) {
    this._unsubscribeAll = new Subject();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this._scrumboardService.onBoardsChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(boards => {
        this.boards = boards;
      });
  }
  newBoard(): void
    {
        const newBoard = new Board({});
        this._scrumboardService.createNewBoard(newBoard).then(() => {
            this.router.navigate(['boards/' + newBoard.id + '/' + newBoard.uri]);
        });
    }

}

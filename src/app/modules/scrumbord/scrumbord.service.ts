import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { rejects } from 'assert';
import { BehaviorSubject, Observable } from 'rxjs';
import { promise } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class ScrumbordService implements Resolve<any> {

  boards: any[];
  routeParams: any;
  board: any;

  onBoardsChanged: BehaviorSubject<any>;
  onBoardChanged: BehaviorSubject<any>;
  // apiUrl: string = `${environment.apiUrl}api`;


  constructor(private _httpClient: HttpClient) {
    this.onBoardsChanged = new BehaviorSubject([]);
    this.onBoardChanged = new BehaviorSubject([]);
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;

    return new Promise<void>((resolve, rejects) => {
      Promise.all([
        this.getBoards()
      ]).then(
        () => {
          resolve();
        },
        rejects
      );
    });
  }
  getBoards(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/scrumboard-boards')
        .subscribe((response: any) => {
          this.boards = response;
          this.onBoardsChanged.next(this.boards);
          resolve(this.boards);
        }, reject);
    });
  }

  getBoard(boardId): Promise<any> {
    console.log("genid")
    return new Promise((resolve, reject) => {
      this._httpClient.get('api/scrumboard-boards/' + boardId)
        .subscribe((response: any) => {
          this.board = response;
          this.onBoardChanged.next(this.board);
          resolve(this.board);
        }, reject);
    });
  }


  addCard(listId, newCard): Promise<any> {
    this.board.lists.map((list) => {
      if (list.id === listId) {
        return list.idCards.push(newCard.id);
      }
    });

    this.board.cards.push(newCard);

    return this.updateBoard();
  }

  addList(newList): Promise<any> {
    this.board.lists.push(newList);

    return this.updateBoard();
  }

  removeList(listId): Promise<any> {
    const list = this.board.lists.find((_list) => {
      return _list.id === listId;
    });

    for (const cardId of list.idCards) {
      this.removeCard(cardId);
    }

    const index = this.board.lists.indexOf(list);

    this.board.lists.splice(index, 1);

    return this.updateBoard();
  }

  removeCard(cardId, listId?): void {
    const card = this.board.cards.find((_card) => {
      return _card.id === cardId;
    });

    if (listId) {
      const list = this.board.lists.find((_list) => {
        return listId === _list.id;
      });
      list.idCards.splice(list.idCards.indexOf(cardId), 1);
    }

    this.board.cards.splice(this.board.cards.indexOf(card), 1);

    this.updateBoard();
  }

  updateBoard(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post('api/scrumboard-boards/' + this.board.id, this.board)
        .subscribe(response => {
          this.onBoardChanged.next(this.board);
          resolve(this.board);
        }, reject);
    });
  }

  updateCard(newCard): void {
    this.board.cards.map((_card) => {
      if (_card.id === newCard.id) {
        return newCard;
      }
    });

    this.updateBoard();
  }

  createNewBoard(board): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post('api/scrumboard-boards/' + board.id, board)
        .subscribe(response => {
          resolve(board);
        }, reject);
    });
  }
}
@Injectable()
export class BoardResolve implements Resolve<any>
{
  /**
   * Constructor
   *
   * @param {ScrumboardService} _scrumboardService
   */
  constructor(
    private _scrumboardService: ScrumbordService
  ) {
  }

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @returns {Promise<any>}
   */
  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    return this._scrumboardService.getBoard(route.paramMap.get('boardId'));
  }
}


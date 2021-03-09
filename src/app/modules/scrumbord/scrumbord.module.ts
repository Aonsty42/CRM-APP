import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrumbordComponent } from './scrumbord.component';
import { BoardComponent } from './board/board.component';
import { AddListComponent } from './board/add-list/add-list.component';

import { EditBoardNameComponent } from './board/edit-board-name/edit-board-name.component';
import { ListComponent } from './board/list/list.component';
import { SettingsComponent } from './board/sidenavs/settings/settings.component';

import { LabelSelectorComponent } from './board/dialogs/card/label-selector/label-selector.component';
import { AddCardComponent } from './board/list/add-card/add-card.component';
import { EditListNameComponent } from './board/list/edit-list-name/edit-list-name.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { BoardResolve, ScrumbordService } from './scrumbord.service';
import { NgxDnDModule } from '@swimlane/ngx-dnd';
import { MatRippleModule } from '@angular/material/core';
import { CardComponent } from './board/list/card/card.component';


const routes: Routes = [

  {
    path: '',
    component: ScrumbordComponent,
    resolve: {
      scrumbord: ScrumbordService
    },
  },
  // {
  //   path: 'boards/:boardId/:boardUri',
  //   component: ScrumbordComponent,
  //   resolve: {
  //     board: BoardResolve
  //   }
  // },
  {
    path: '**',
    redirectTo: 'boards'
  }

]


@NgModule({
  declarations: [ScrumbordComponent, BoardComponent, AddListComponent, EditBoardNameComponent, ListComponent, SettingsComponent, CardComponent, LabelSelectorComponent, AddCardComponent, EditListNameComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatRippleModule,

    NgxDnDModule,

  ],
  providers      : [
    ScrumbordService,
    BoardResolve
],
})
export class ScrumbordModule { }

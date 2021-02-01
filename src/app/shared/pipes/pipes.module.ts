import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeysPipe } from './keys.pipe';
import { GetByIdPipe } from './getById.pipe';
import { HtmlToPlaintextPipe } from './htmlToPlaintext.pipe';
import { FilterPipe } from './filter.pipe';
import { CamelCaseToDashPipe } from './camelCaseToDash.pipe';
import { ShotNamePipe } from './shot-name.pipe';
import { TitleURLPipe } from './titleUrl.pipe';
import { OrderByPipe } from './orderBy.pipe';


@NgModule({
  declarations: [
    KeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe,
    ShotNamePipe,
    TitleURLPipe,
    OrderByPipe

  ],
  imports: [
    CommonModule
  ],
  exports:[
    KeysPipe,
    GetByIdPipe,
    HtmlToPlaintextPipe,
    FilterPipe,
    CamelCaseToDashPipe,
    ShotNamePipe,
    TitleURLPipe,
    OrderByPipe
  ]
})
export class PipesModule { }

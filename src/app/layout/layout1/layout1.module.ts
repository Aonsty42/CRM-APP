import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout1Component } from './layout1.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout'
import { ProgressbarModule } from '../component/progressbar/progressbar.module';


@NgModule({
  declarations: [Layout1Component],
  imports: [
    CommonModule,
    RouterModule,
    LayoutModule,

    SharedModule,
    ProgressbarModule

  ],
  exports: [Layout1Component]
})
export class Layout1Module { }

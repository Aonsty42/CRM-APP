import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericDetailComponent } from './generic-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { GenericDetailService } from './generic-detail.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeftFormModule } from '../left-form/left-form.module';

const routes: Routes =[
  {
    path: '',
    component:GenericDetailComponent,
    resolve: [GenericDetailService]
  }
];

@NgModule({
  declarations: [GenericDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    SharedModule,
    LeftFormModule
  ]
})
export class GenericDetailModule { }

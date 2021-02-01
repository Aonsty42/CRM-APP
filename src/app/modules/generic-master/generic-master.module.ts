import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericMasterComponent } from './generic-master.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { GenericMasterService } from './generic-master.service';

const routes: Routes = [
  {
    path: '',
    component: GenericMasterComponent,
    resolve: [GenericMasterService]
  }
];

@NgModule({
  declarations: [GenericMasterComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    SharedModule
  ]
})
export class GenericMasterModule { }

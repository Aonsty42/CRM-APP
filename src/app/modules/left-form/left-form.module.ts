import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeftFormComponent } from './left-form.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { DealFormComponent } from './deal-form/deal-form.component';
import { DocumentFormComponent } from './document-form/document-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { Mk06FormComponent } from './mk06-form/mk06-form.component';
import { Mk13FormComponent } from './mk13-form/mk13-form.component';
import { Mk11FormComponent } from './mk11-form/mk11-form.component';
import { SoFormComponent } from './so-form/so-form.component';



@NgModule({
  declarations: [LeftFormComponent, ContactFormComponent, CustomerFormComponent, DealFormComponent, DocumentFormComponent, Mk06FormComponent, Mk13FormComponent, Mk11FormComponent, SoFormComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [LeftFormComponent]
})
export class LeftFormModule { }

import { viewClassName } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'scrumboard-board-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddListComponent implements OnInit {

  formActive: boolean;
  form: FormGroup;

  @Output()
  listAdded: EventEmitter<any>;

  @ViewChild('nameInput')
  nameInputField;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.formActive = false;
    this.listAdded = new EventEmitter();
  }

  openForm(): void {
    this.form = this._formBuilder.group({
      name: ['']
    });
    this.formActive = true;
    this.focusNameField();
  }

  closeForm(): void {
    this.formActive = false;
  }

  focusNameField(): void {
    setTimeout(() => {
      this.nameInputField.nativeElement.focus();
    });
  }
  onFormSubmit(): void {
    if (this.form.valid) {
      this.listAdded.next(this.form.getRawValue().name);
      this.formActive = false;
    }
  }


  ngOnInit(): void {
  }

}

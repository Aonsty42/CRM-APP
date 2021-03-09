import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'scrumboard-board-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCardComponent implements OnInit {

  formActive: boolean;
  form: FormGroup;

  @Output()
  cardAdded: EventEmitter<any>;

  @ViewChild('nameInput')
  nameInputField;

  constructor(private _formBuilder: FormBuilder) {
    this.formActive = false;
    this.cardAdded = new EventEmitter();
  }

  ngOnInit(): void {
  }
  openForm(): void {
    this.form = this._formBuilder.group({
      name: ''
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
      const cardName = this.form.getRawValue().name;
      this.cardAdded.next(cardName);
      this.formActive = false;
    }
  }

}

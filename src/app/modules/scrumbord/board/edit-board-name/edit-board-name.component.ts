import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'scrumboard-edit-board-name',
  templateUrl: './edit-board-name.component.html',
  styleUrls: ['./edit-board-name.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditBoardNameComponent implements OnInit {

  formActive: boolean;
  form: FormGroup;

  @Input()
  board;

  @Output()
  boardNameChanged: EventEmitter<any>;

  @ViewChild('nameInput')
  nameInputField;

  constructor(private formBuilder: FormBuilder) {
    this.formActive = false;
    this.boardNameChanged = new EventEmitter();
  }

  ngOnInit(): void {
  }

  openForm(): void {
    this.form = this.formBuilder.group({
      name: [this.board.name]
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
      this.board.name = this.form.getRawValue().name;
      this.board.uri = encodeURIComponent(this.board.name).replace(/%20/g, '-').toLowerCase();

      this.boardNameChanged.next(this.board.name);
      this.formActive = false;
    }
  }

}

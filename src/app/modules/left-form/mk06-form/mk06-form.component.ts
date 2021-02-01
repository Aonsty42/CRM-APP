import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mk06-form',
  templateUrl: './mk06-form.component.html',
  styleUrls: ['./mk06-form.component.scss']
})
export class Mk06FormComponent implements OnInit {
  @Input() model: any
  constructor() { }

  ngOnInit(): void {
  }

}

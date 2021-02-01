import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mk11-form',
  templateUrl: './mk11-form.component.html',
  styleUrls: ['./mk11-form.component.scss']
})
export class Mk11FormComponent implements OnInit {
  @Input() model: any
  constructor() { }

  ngOnInit(): void {
  }

}

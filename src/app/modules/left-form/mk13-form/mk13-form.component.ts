import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-mk13-form',
  templateUrl: './mk13-form.component.html',
  styleUrls: ['./mk13-form.component.scss']
})
export class Mk13FormComponent implements OnInit {
  @Input() model: any
  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-form',
  templateUrl: './left-form.component.html',
  styleUrls: ['./left-form.component.scss']
})
export class LeftFormComponent implements OnInit {
  @Input() model: any;
  constructor() { }

  ngOnInit(): void {
  }

}

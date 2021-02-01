import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-so-form',
  templateUrl: './so-form.component.html',
  styleUrls: ['./so-form.component.scss']
})
export class SoFormComponent implements OnInit {
  @Input() model: any
  constructor() { }

  ngOnInit(): void {
  }

}

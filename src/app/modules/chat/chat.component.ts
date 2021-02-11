import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  @ViewChild('drawer') drawer: MatSidenav;
  data:any;

  constructor(
    public chatService: ChatService
  ) { }

  ngOnInit(): void {
    this.chatService.getUserData();
    this.data = this.chatService.getUserData();
  }


  toggle() {
    this.drawer.toggle();
  }

}

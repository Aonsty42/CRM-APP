import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {


  @ViewChild('drawer') drawer: MatSidenav;
  data: any;
  messages: any = [];
  message: string;
  profile: any = [];

  private _unsubscribeAll: Subject<any>;

  bodyData = [
    {
      "createby": "Theerasak Tubrit",
      "updateby": "Theerasak Tubrit",
      "_id": "60117256f8fdce329c904b0e",
      "contactName": "MR.AonZ",
      "contactPic": "../../../assets/image/0jUjAfPW_400x400.jpg",
      "contactMes": "ว่างาย",
      "contactCompany": "เพชร_Gamingto",
      "contactPhoneNo": "099-77555558",
      "contactChat": [],
      "contactEmail": "test220@gmail.com",
      "contactLineId": "Pet_20",
      "contactAddress": "467/4",
      "created": "2021-01-27T14:01:58.152Z",

      "__v": 0,
      "id": "60117256f8fdce329c904b0e",
      "updated": "2021-01-27T14:04:53.059Z"
    },
  ]
  constructor(
    public chatService: ChatService, private router: Router) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // this.chatService.getUserData();
    // this.data = this.chatService.getUserData();

    this.chatService.getServerEventSource('http://localhost:3000/events')
      .subscribe((chat) => {
        let data = JSON.parse(chat.data);
        if (data.lenght > 0) {
          data.forEach(chatsend => {
            this.bodyData[0].contactChat.push(chatsend);
          });
          this.messages = this.bodyData[0].contactChat;
        } else {
          console.log("hii");
          this.messages.push(data)
        }
      });

    this.chatService.getProfile().then((ldata) => {
      this.profile = ldata.data ;
      console.log(this.profile);
    });
  }


  toggle() {
    this.drawer.toggle();
  }

  async sendMessage() {
    let body = {
      "messaging_type": "RESPONSE",
      "recipient": {
        "id": "2859412940850492"
      },
      "message": { "text": this.message }
    }
    this.chatService.sendData(body).then(() => {
      this.message = '';
      // this.chatService.getServerEventSource('http://localhost:3000/events')
      //   .subscribe((chat) => {
      //     let data = JSON.parse(chat.data);
      //     this.messages = data
      //   })
    })
  }


}

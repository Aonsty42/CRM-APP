import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { promise } from 'protractor';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { SseService } from 'src/app/shared/services/sse.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements Resolve<any> {
  [x: string]: any;

  private OnDataChanged$ = new BehaviorSubject<any[]>([]);
  public OnDataChangeObserveble$ = this.OnDataChanged$.asObservable();

  constructor(private zone: NgZone, private ssService: SseService, private httpClient: HttpClient) { }

  getServerEventSource(url: string) {
    return Observable.create(observer => {
      const eventSource = this.ssService.getEventSource(url);
      console.log(eventSource);

      eventSource.addEventListener("chat", event => {
        // console.log(event);
        this.zone.run(() => {
          observer.next(event);
        });
      })

      eventSource.onmessage = event => {
        console.log(event);
        this.zone.run(() => {
          observer.next(event);
        });
      };

      eventSource.onerror = error => {
        console.log(error);
        this.zone.run(() => {
          observer.error(error);
        });
      };
    })


  }

  sendData(data): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:3000/sendevents', data).subscribe(res => {
        resolve(res)
      }, reject)
    })
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.getUserData();
  }

  getUserData() {

    let body = [
      {
        "createby": "Theerasak Tubrit",
        "updateby": "Theerasak Tubrit",
        "_id": "60117256f8fdce329c904b0e",
        "contactName": "MR.AonZ",
        "contactPic": "../../../assets/image/0jUjAfPW_400x400.jpg",
        "contactMes": "ว่างาย",
        "contactCompany": "เพชร_Gamingto",
        "contactPhoneNo": "099-77555558",
        "contactEmail": "test220@gmail.com",
        "contactLineId": "Pet_20",
        "contactAddress": "467/4",
        "created": "2021-01-27T14:01:58.152Z",

        "__v": 0,
        "id": "60117256f8fdce329c904b0e",
        "updated": "2021-01-27T14:04:53.059Z"
      },
      {
        "createby": "Theerasak Tubrit",
        "updateby": "Theerasak Tubrit",
        "_id": "60117256f8fdce329c904b0e",
        "contactName": "มิส'เตอร์ อ้น'น",
        "contactPic": "../../../assets/image/o398xcu17gm5X8zwDa5-o.jpg",
        "contactMes": "Hey Mister",
        "contactCompany": "เพชร_Gamingto",
        "contactPhoneNo": "099-77555558",
        "contactEmail": "test220@gmail.com",
        "contactLineId": "Pet_20",
        "contactAddress": "467/4",
        "created": "2021-01-27T14:01:58.152Z",
        "__v": 0,
        "id": "60117256f8fdce329c904b0e",
        "updated": "2021-01-27T14:04:53.059Z"
      }

    ]

    return body;
  }

  getProfile(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('http://localhost:3000/getProfile').subscribe(res => {
        resolve(res)
      }, reject)
    })
  }
}

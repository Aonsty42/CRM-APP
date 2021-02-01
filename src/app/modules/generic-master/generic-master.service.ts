import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericMasterService implements Resolve<any>{

  private layoutChanged$ = new BehaviorSubject<any[]>([]);
  public layoutChangedObservable$ = this.layoutChanged$.asObservable();
  private onDataChanged$ = new BehaviorSubject<any[]>([]);
  public onDataChangedObservable$ = this.onDataChanged$.asObservable();
  layouts: any[];
  apiUrl:string = `${environment.apiUrl}api`;

  constructor(private httpClient: HttpClient) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.getLayouts(route.parent.data.layouts);
    return;
  }

  getLayouts(dataLayouts: string[]): any {
    this.httpClient.get(`${this.apiUrl}/layouts`)
      .pipe(
        map((layouts: any) =>{
          if (dataLayouts){
            return layouts.filter(layout => dataLayouts.includes(layout.key))
          } else {
            return layouts;
          }
        })
      )
      .subscribe((layouts: any[]) => {
        this.layouts = layouts;
        this.getListData(this.layouts[0].apiUrl);
        this.layoutChanged$.next(layouts.sort((a,b) => a.order - b.order));
      })
  }
  getListData(layoutApiUrl: string, pageIndex?: number, pageSize?: number): void{
    this.httpClient.get(`${this.apiUrl}/${layoutApiUrl}`)
      .subscribe((data: any) => {
        this.onDataChanged$.next(data);
      })
  }

  getDataByID(layoutApiUrl: string, id: any): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/${layoutApiUrl}/${id}`);
  }

  updateData(layoutApiUrl: string, payload: any): Observable<any> {
    let subject = new Subject<any>();
    if (!payload.id) {
      this.httpClient.post(`${this.apiUrl}/${layoutApiUrl}`, payload)
        .subscribe((data) => {
          this.getListData(layoutApiUrl);
          subject.next(data);
        });
    } else {
      this.httpClient.put(`${this.apiUrl}/${layoutApiUrl}/${payload.id}`, payload)
        .subscribe((data) => {
          this.getListData(layoutApiUrl);
          subject.next(data);
        })
    }
    return subject;
  }

  deleteData(layoutApiUrl: string, id: any): Observable<any> {
    let subject = new Subject();
    this.httpClient.delete(`${this.apiUrl}/${layoutApiUrl}/${id}`)
      .subscribe((data) => {
        this.getListData(layoutApiUrl);
        subject.next(data);
      });

    return subject;

  }
}

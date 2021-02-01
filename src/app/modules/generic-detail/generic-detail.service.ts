import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GenericDetailService implements Resolve<any> {


  private layoutChanged$ = new BehaviorSubject<any[]>([]);
  public layoutChangedObservable$ = this.layoutChanged$.asObservable();
  private masterRelateGethered$ = new BehaviorSubject<any[]>([]);
  public masterRelateGetheredObservable$ = this.masterRelateGethered$.asObservable();
  private onDataChanged$ = new BehaviorSubject<any[]>([]);
  public onDataChangedObservable$ = this.onDataChanged$.asObservable();
  layouts: any[];
  apiUrl: string = `${environment.apiUrl}api`;
  relateId: string;
  relateModule: string;
  lookupFields: string[];

  constructor(private httpClient: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (route.params && route.params.id){
      this.relateId = route.params.id;
      this.relateModule = route.parent.data.masterApiUrl;
      this.lookupFields = route.parent.data.lookupFields;
      this.getMasterRelateDataByID(route.parent.data.masterApiUrl, route.params.id);
    }
    this.getLayouts(route.parent.data.layouts);
    return
    ;
  }
  getLayouts(dataLayouts: string[]): any {
    this.httpClient.get(`${this.apiUrl}/layouts`)
      .pipe(
        map((layouts: any) => {
          if (dataLayouts) {
            return layouts.filter(layout => dataLayouts.includes(layout.key))
          } else {
            return layouts;
          }
        })
      )
      .subscribe((layouts: any[]) => {
        this.layouts = layouts;
        this.layoutChanged$.next(layouts.sort((a,b) => a.order - b.order));
      })

  }
  getMasterRelateDataByID(layoutApiUrl: string, id:any): void {
    this.httpClient.get(`${this.apiUrl}/${layoutApiUrl}/${id}`)
      .subscribe((data: any) => {
        data.name = data.name || data[`${layoutApiUrl.substring(0, layoutApiUrl.length - 1)}Name`] || data[`docNo`] || data[`bomCode`];
        data.layout = layoutApiUrl;
        this.masterRelateGethered$.next(data);
      });
  }

  getListData(layoutApiUrl: string, pageIndex?: number, pageSize?: number): void {
    this.httpClient.get(`${this.apiUrl}/${layoutApiUrl}?relateId=${this.relateId}`)
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

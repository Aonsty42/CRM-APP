import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.scss']
})
export class Layout1Component implements OnInit, OnDestroy {

  isChild = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  pageName$: Observable<any> = this.router.events
    .pipe(
      filter((event) => event instanceof NavigationEnd)
    );

  private _unsubscribeAll: Subject<any>;
  constructor(
    private breakpointObserver: BreakpointObserver,
    public auth: AuthService,
    private router: Router) {


    this._unsubscribeAll = new Subject();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngOnInit(): void {
    this.auth.authStateObservable$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((isAuthenticated) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('');
        }
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((data) => {
        const objData = JSON.stringify(data);
        const jsonData = JSON.parse(objData);
        this.isChild = jsonData.url.split('/').length > 2;

      });

  }
  logout():void{
    this.auth.logout();
  }


}

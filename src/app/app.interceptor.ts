import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let httpReq = req;
    const token = localStorage.getItem('token');
    if (token != null) {
      httpReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    if (httpReq.method.toString() === "DELETE") {
      let r = confirm("คุณต้องการลบข้อมูลใช่หรือไม่?");
      if (r == false) {
        return of();
      }

    }
    return next.handle(httpReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body && event.ok) {
            // console.log(event.body);
            switch (httpReq.method.toString()) {
              case 'POST':
                // console.log(event.body);
                alert("สร้างข้ออมูลสำเร็จ");
                break;
              case 'PUT':
                // console.log(event.body);
                alert("แก้ไขข้ออมูลสำเร็จ");
                break;
              case 'DELETE':
                // console.log(event.body);
                alert("ลบข้ออมูลสำเร็จ");
                break;
              default:
                break;
            }
          }

        }

      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          // console.log('this is client side error');
          errorMsg = `Error: ${error.error.message}`;
        }
        else {
          console.log('this is server side error');
          errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        // console.log(errorMsg);
        // this.toasterService.error(errorMsg, error.error.title, { positionClass: 'toast-bottom-center' });
        // alert(errorMsg);
        return throwError(errorMsg);
      })
    );
  }
}

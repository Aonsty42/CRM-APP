import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
@Injectable()
export class AppErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        let message;
        const stackTrace = null;

        console.log(error);
        // console.log(new Date() + ": " + JSON.stringify(error));
    }

}

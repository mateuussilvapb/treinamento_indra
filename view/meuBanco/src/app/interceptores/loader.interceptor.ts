import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  count = 0;
  constructor(private spinner: NgxSpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    this.count++;

    return next.handle(request).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.spinner.hide();
        }
      })
    );
  }
}

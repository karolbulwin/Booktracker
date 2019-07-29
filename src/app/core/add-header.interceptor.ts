import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(`AddHeaderInterceptor::: ${req.url}`);

    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: { 'Content-Type': 'application/json' }
    });

    return next.handle(jsonReq);
  }
}

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem("token") ?? "";
    if (token) {
      request = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + token),
      });
    }
    if (!request.headers.has("Content-Type")) {
      request = request.clone({
        headers: request.headers.set("Content-Type", "application/json"),
      });
    }
    request = request.clone({
      headers: request.headers.set("Accept", "application/json"),
    });

    return next.handle(request);
  }
}

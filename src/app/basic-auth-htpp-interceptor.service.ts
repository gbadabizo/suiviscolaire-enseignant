import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }
/*
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    if (sessionStorage.getItem('username') && sessionStorage.getItem('basicauth')) {
      req = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('basicauth')
        }
      })
    }
    console.log(req);

    return next.handle(req);

  }
*/
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
 
    if (!request.headers.has('Accept')) {
      request = request.clone({headers: request.headers.set('Accept', 'application/json')});
    }
 
    request = request.clone({headers: request.headers.set('Accept-Language', 'fr-FR')});
    if (sessionStorage.getItem('username') && sessionStorage.getItem('basicauth')) {
      request = request.clone({headers: request.headers.set('Authorization', sessionStorage.getItem('basicauth'))});
      
    }
 
    return next.handle(request);
 
  }
}

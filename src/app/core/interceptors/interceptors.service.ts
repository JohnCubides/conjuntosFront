
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, retry } from 'rxjs/operators';
import { JwtService } from '../services/jwt-service/jwt.service';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class InterceptorsService implements HttpInterceptor {

  protected endpointv1 = environment.endpointv1;

  constructor(private readonly jwt: JwtService, private httpC: HttpClient,
              private localStorage: LocalStorageService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('/refreshtoken') || req.url.includes('/assets')) {
      return next.handle(req);
    }

    const hardcodedToken = localStorage.getItem('token');

    const expirationDate = this.jwt.getTokenExpirationDate(hardcodedToken);

    if (expirationDate !== null) {
      let dateToken = expirationDate.getTime();
      let now: Date = new Date();

      let res = Math.abs(dateToken.valueOf() - now.valueOf()) / 1000;
      let minutes = Math.floor(res / 60) % 60;

      if (minutes <= 2) {
        let headers = new HttpHeaders().append(
          'Authorization', `Bearer ${hardcodedToken}`)
          .append('refreshToken', localStorage.getItem('refreshToken'));
        this.httpC.post(`${this.endpointv1}/users/refreshtoken`, {}, {headers}).toPromise().then((result: any) => {
          if (result && result.token) {
            localStorage.setItem('token', result.token);
            console.log('refresh ok', result);
          }
        },
          error => {
            this.localStorage.removeItem('token');
            this.localStorage.removeItem('refreshToken');
            this.router.navigate(['/account/login']);
          }
        );
      }
    }

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${hardcodedToken}`
      }
    });

    return next.handle(req)
      .pipe(
        // Handle errors
        catchError((error: HttpErrorResponse) => {
          // TODO: Add error handling logic here
          return throwError(error);
        })
      );
  }
}

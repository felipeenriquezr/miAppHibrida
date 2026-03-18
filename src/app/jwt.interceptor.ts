import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Importamos tu nuevo servicio
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 1. Convertimos la promesa del Token en un Observable
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        // 2. Si tenemos un token, clonamos la petición y le añadimos el Header
        if (token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
        }

        // 3. Enviamos la petición (con o sin token)
        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            // 4. Si el servidor responde 401 (Token expirado o inválido)
            if (error.status === 401) {
              console.error('Sesión expirada o no autorizada');
              // Podrías redirigir al login aquí si fuera necesario
              // this.router.navigate(['/register']);
            }
            return throwError(() => error);
          })
        );
      })
    );
  }
}
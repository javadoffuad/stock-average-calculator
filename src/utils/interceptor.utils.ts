import {HttpHandlerFn, HttpRequest} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth/auth.service';

export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).getAccessToken();
  const headers = req.headers.append('Authorization', `Bearer ${authToken}`);
  headers.append('Content-Type', 'application/json');

  const newReq = req.clone({
    headers: headers,
  });
  return next(newReq);
}

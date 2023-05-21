import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Esta clase actuará como interceptor de peticiones http.
 * Se encargará de interceptar las peticiones que enviemos al servidor
 * y crear una petición nueva a partir de esta a la que añadiremos en las cabeceras
 * un token de verificidad. Posteriormente será esta petición la que se procesará
 */

export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    /**
     * Obtenemos el token del sessionStorage
     */
    const token = sessionStorage.getItem('token');
    /**
     * Si existe el token =>
     * Clonamos la petición y le añadimos el token en las cabeceras
     */
    if (token) {
      const tokenizedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      /**
       * Devolvemos un observable con la nueva petición a procesar por el servidor
       */
      return next.handle(tokenizedRequest);

    } else {
      return next.handle(req);
    }
  }
}

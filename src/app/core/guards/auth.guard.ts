import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      // Si hay un usuario logueado, permite el acceso a la ruta.
      return true;
    }

    // Si NO hay usuario, deniega el acceso y redirige a la página de login.
    console.log('AuthGuard: Acceso denegado, redirigiendo a login...');
    this.router.navigate(['/auth/login']);
    return false;
  }
}
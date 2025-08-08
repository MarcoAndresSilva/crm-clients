import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { AuthService, AuthResponse } from '../../../../app/core/services/auth.service'; // Importar
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sidenav!: MatSidenav; // Recibimos la referencia del sidenav y el ! indica que confiamos en qeu este valor sera proporcionado por el padre layout.component

  user$: Observable<AuthResponse | null>; // Observador para el usuario actual

  constructor(private authService: AuthService, private router: Router) { 
    this.user$ = this.authService.user$;
  }

  onLogout() {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }

}


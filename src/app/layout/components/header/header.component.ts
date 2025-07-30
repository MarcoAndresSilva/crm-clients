import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() sidenav!: MatSidenav; // Recibimos la referencia del sidenav y el ! indica que confiamos en qeu este valor sera proporcionado por el padre layout.component
}

import { Component } from '@angular/core';

// Datos de ejemplo
const ELEMENT_DATA = [
  {id: 1, name: 'Juan Pérez', company: 'Tech Solutions', email: 'juan.perez@tech.com'},
  {id: 2, name: 'Ana Gómez', company: 'Innovate Corp', email: 'ana.gomez@innovate.com'},
  {id: 3, name: 'Carlos Sánchez', company: 'Marketing Digital', email: 'carlos@marketing.cl'},
  {id: 4, name: 'Laura Fernández', company: 'Consultores Asociados', email: 'laura.f@consultores.com'},
];

@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {

  displayedColumns: string[] = ['id', 'name', 'company', 'email'];
  dataSource = ELEMENT_DATA;

}

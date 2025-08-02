import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Client } from '../../../../core/models/client.model';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {

  clients$!: Observable<Client[]>; // la funete de datos ya no es un array sino un Observable que se obtiene de un servicio y que emite un array de clientes

  displayedColumns: string[] = [ 'id', 'name', 'company', 'email', 'phone']; //columnas que se mostraran en la tabla 

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clients$ = this.clientService.getClients(); // Al iniciar el componente, llamamos al servicio para obtener los clientes.
  }

}

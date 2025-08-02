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

  // lka funete de datos ya no es un array sino un Observable que se obtiene de un servicio y que emite un array de clientes
  clients$!: Observable<Client[]>;

  //columnas que se mostraran en la tabla 
  displayedColumns: string[] = ['name', 'company', 'email', 'phone', 'actions'];

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    // Al iniciar el componente, llamamos al servicio para obtener los clientes.
    this.clients$ = this.clientService.getClients();
  }

}

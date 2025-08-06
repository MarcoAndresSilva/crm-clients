import { Component, OnInit } from '@angular/core';

import { Client } from '../../../../core/models/client.model';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent {

  clients: Client[] = []; // Variable para almacenar los clientes obtenidos del servicio
  isLoading = true;
  error: string | null = null;

  displayedColumns: string[] = [ 'id', 'name', 'company', 'email', 'phone', 'actions']; //columnas que se mostraran en la tabla 

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoading = true;
    this.error = null;

    this.clientService.getClients().subscribe({
      next: (clients) => { // usa next para manejar la respuesta exitosa
        this.clients = clients;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al obtener los clientes';
        console.error('Error al obtener los clientes', error);
        this.isLoading = false;
      }
    });
  }

}

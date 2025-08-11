import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';

import { ConfirmDialogComponent, DialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

import { Client, PaginatedClientsResponse } from '../../../../core/models/client.model';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: false,
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit, OnDestroy {

  clients: Client[] = []; // Variable para almacenar los clientes obtenidos del servicio
  isLoading = true;
  error: string | null = null;

  totalClients = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions = [5, 10, 20];

  displayedColumns: string[] = [ 'id', 'name', 'company', 'email', 'phone', 'actions']; //columnas que se mostraran en la tabla 

  private destroy$ = new Subject<void>();

  constructor(
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
      console.log('ClientListComponent: ngOnInit se ha disparado!');
    this.loadClients();

    this.clientService.clientsUpdated$.
      pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log('ClientListComponent: Notificación de actualización recibida. Recargando clientes...');
        this.loadClients();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); 
    this.destroy$.complete();
    console.log('ClientListComponent: Destruido. Suscripciones limpiadas.');
  }

  loadClients(): void {
    console.log('ClientListComponent: loadClients se ha disparado!');

    this.isLoading = true;
    this.error = null;

    this.clientService.getClients(this.currentPage +  1, this.pageSize).subscribe({
      next: (response: PaginatedClientsResponse) => { // usa next para manejar la respuesta exitosa
        this.clients = response.data;
        this.totalClients = response.totalClients;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error al obtener los clientes';
        console.error('Error al obtener los clientes', error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadClients();
  }


  deleteClient(id: string | undefined): void {
    if(!id) return; // si no hay un id, no hacemos nada}

    const dialogData: DialogData = {
      title: 'Eliminar cliente',
      message: '¿Estás seguro de que deseas eliminar este cliente?'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(id).subscribe({
          next: () => {
            this.snackBar.open('Cliente eliminado correctamente', 'Cerrar', {
              duration: 3000,
              verticalPosition: 'top',
              panelClass: ['snackbar-purple']
            });
            this.clientService.notifyClientsUpdated();
          },
          error: (error) => {
            this.snackBar.open('Error al eliminar el cliente', 'Cerrar', {
              duration: 5000,
              verticalPosition: 'top',
              panelClass: ['snackbar-error']
            });
            console.error('Error al eliminar el cliente', error);
          }
        });
      }
    });
  }

  editClient(id: string | undefined): void {
    if (!id) return;
    this.router.navigate(['/clients/edit', id]);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models/client.model';
@Component({
  selector: 'app-client-form',
  standalone: false,
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;
  isSubmitting = false;
  isEditMode = false;
  private clientId: string | null = null;

  // inyectamos fombuilder y router paar crear el formulario y navegar
  constructor(
      private formBuilder: FormBuilder, 
      private router: Router,
      private route: ActivatedRoute,
      private clientService: ClientService,
      private snackBar: MatSnackBar
    ) {
    this.clientForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });    
  }


  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id'); // obtenemos el id del cliente
    this.isEditMode = !!this.clientId; // si el id es null, entonces no estamos en modo edición

    if(this.isEditMode && this.clientId) {
      this.isSubmitting = true;
      this.clientService.getClientById(this.clientId).subscribe({
        next: (clientData) => {
          this.clientForm.patchValue(clientData); // Usamos 'patchValue' para rellenar el formulario con los datos recibidos
          this.isSubmitting = false; // Dejamos de cargar una vez que el formulario está lleno
        },
        error: (err) => {
          this.snackBar.open('Error al cargar los datos del cliente', 'Cerrar', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
          this.isSubmitting = false;
          this.router.navigate(['/clients']); // Si hay error, volvemos a la lista
        }
      });
    }
  }

  onSubmit() {
    if (this.clientForm.invalid || this.isSubmitting) {
      return
    }

    this.isSubmitting = true;

    const clientData = this.clientForm.value;
    let action$: Observable<Client | any>;

    if(this.isEditMode && this.clientId) {
      action$ = this.clientService.updateClient(this.clientId, clientData);
    } else {
      action$ = this.clientService.addClient(clientData);
    }

    action$.subscribe({
      next:() => {
        const message = this.isEditMode ? '¡Cliente actualizado exitosamente!' : '¡Cliente creado exitosamente!';
        this.snackBar.open(message, 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbar-purple']
        });
        this.clientService.notifyClientsUpdated();
        this.router.navigate(['/clients']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || (this.isEditMode ? 'Error al actualizar el cliente' : 'Error al crear el cliente');
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
        this.isSubmitting = false;
      }
    });
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }

}

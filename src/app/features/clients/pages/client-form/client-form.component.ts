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
  pageTitle = "Nuevo Cliente";

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
      phone: ['']
    });    
  }

  ngOnInit(): void {
    console.log("--- FORMULARIO INICIADO ---");

    this.clientId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.clientId;
    
    console.log(`ID de la URL: ${this.clientId}`);
    console.log(`Modo Edición: ${this.isEditMode}`);
    
    if (this.isEditMode && this.clientId) {
      console.log("-> DETECTADO MODO EDICIÓN. Cargando datos...");
      this.pageTitle = "Editar Cliente";
      this.isSubmitting = true; // Mostramos spinner en el botón mientras cargan los datos

      this.clientService.getClientById(this.clientId).subscribe({
        next: (clientData) => {
          console.log("-> DATOS RECIBIDOS DE LA API:", clientData);
          this.clientForm.patchValue(clientData);
          console.log("-> FORMULARIO RELLENADO. Estado:", this.clientForm.status);
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error("-> ERROR al cargar datos del cliente:", err);
          this.snackBar.open('Error al cargar los datos del cliente', 'Cerrar', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
          this.isSubmitting = false;
          this.router.navigate(['/clients']);
        }
      });
    } else {
      console.log("-> DETECTADO MODO CREACIÓN.");
    }
  }

  onSubmit(): void {
    console.log("--- SUBMIT PRESIONADO ---");
    console.log(`Estado del formulario: ${this.clientForm.status}`);
    console.log(`Valor de isSubmitting: ${this.isSubmitting}`);

    if (this.clientForm.invalid) {
      console.error("-> SUBMIT DETENIDO: El formulario es inválido.");
      // Forzamos que se muestren los errores en todos los campos
      this.clientForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting) {
      console.warn("-> SUBMIT DETENIDO: Ya hay una operación en curso.");
      return;
    }

    this.isSubmitting = true;
    const clientData = this.clientForm.value;
    let action$: Observable<Client | any>;

    if (this.isEditMode && this.clientId) {
      console.log("-> EJECUTANDO ACCIÓN: Actualizar Cliente");
      action$ = this.clientService.updateClient(this.clientId, clientData);
    } else {
      console.log("-> EJECUTANDO ACCIÓN: Crear Cliente");
      action$ = this.clientService.addClient(clientData);
    }

    action$.subscribe({
      next:() => {
        console.log("-> ACCIÓN COMPLETADA CON ÉXITO");
        const message = this.isEditMode ? '¡Cliente actualizado!' : '¡Cliente creado!';
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
        console.error("-> ERROR EN LA ACCIÓN:", err);
        const errorMessage = err.error?.message || 'Ocurrió un error inesperado.';
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
        this.isSubmitting = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/clients']);
  }
}
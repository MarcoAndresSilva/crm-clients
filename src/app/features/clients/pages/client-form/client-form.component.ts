import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-form',
  standalone: false,
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;
  isSubmitting = false;

  // inyectamos fombuilder y router paar crear el formulario y navegar y matsnackbar
  constructor(
      private formBuilder: FormBuilder, 
      private router: Router,
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
    
  }

  onSubmit() {
    if (this.clientForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    
    this.clientService.addClient(this.clientForm.value).subscribe({
      next: (newClient) => {
        this.snackBar.open('Cliente agregado con exito', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbar-purple']
        });
        this.router.navigate(['/clients']);
      },
      error: (error) => {
        this.snackBar.open(error.message || 'Error al agregar el cliente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbar-error']
        });
        this.isSubmitting = false;}
    });
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }

}

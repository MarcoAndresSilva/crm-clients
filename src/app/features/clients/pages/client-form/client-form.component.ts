import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../../../core/services/client.service';

@Component({
  selector: 'app-client-form',
  standalone: false,
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;

  // inyectamos fombuilder y router paar crear el formulario y navegar
  constructor(
      private formBuilder: FormBuilder, 
      private router: Router,
      private clientService: ClientService
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
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      return;
    }
    console.log('Formulario válido, enviando datos al servicio:');
    
    this.clientService.addClient(this.clientForm.value).subscribe({
      next: (newClient) => {
        console.log('Servicio: Cliente agregado', newClient);
        this.router.navigate(['/clients']);
      },
      error: (error) => {
        console.error('Servicio: Error al agregar cliente', error);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }

}

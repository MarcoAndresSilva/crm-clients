import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  standalone: false,
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;

  // inyectamos fombuilder y router paar crear el formulario y navegar
  constructor(private formBuilder: FormBuilder, private router: Router) {
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
    }
    console.log('Formulario válido, enviando datos:', this.clientForm.value);
    this.router.navigate(['/clients']);
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }

}

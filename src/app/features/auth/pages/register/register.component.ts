import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    // El formulario de registro tiene un campo extra: 'username'
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/clients']);
    }
  }

  onSubmit() {
    if (this.registerForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snackBar.open('Registro exitoso', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbar-purple']
        });
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Error en el registro. Intente de nuevo.';
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
        this.isSubmitting = false;
      }
    });
  }


}

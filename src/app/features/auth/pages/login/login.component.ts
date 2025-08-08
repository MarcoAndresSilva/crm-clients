import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../core/services/auth.service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  loginForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if(this.authService.currentUserValue){
      this.router.navigate(['/Clients']);
    } 
  }

  onSubmit(){
    if(this.loginForm.invalid || this.isSubmitting){
      return;
    }
    this.isSubmitting = true;
    
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.snackBar.open('Login exitoso', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbar-purple']
        });
        this.router.navigate(['/clients']);
      },
      error: (err) => {
        const errorMessage = err.error?.message || 'Email o contraseña inválidos. Intente de nuevo.';
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbar-error']
        });
        this.isSubmitting = false;
      }
    });
  }
}

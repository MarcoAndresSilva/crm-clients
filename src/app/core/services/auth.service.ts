import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export interface AuthResponse {
  _id: string;
  username: string;
  email:string;
  token:string;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  private userSubject = new BehaviorSubject<AuthResponse | null>(null); // behaviorSubject para manejar el estado del usuario
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromStorage(); // al iniciar el servicio cargo el usuario desde el localStorage
  }
  
  private loadUserFromStorage(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  register(userData:any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('user', JSON.stringify(response));
        this.userSubject.next(response);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  public get currentUserValue(): AuthResponse | null { // Getter para obtener el valor actual del usuario
    return this.userSubject.value;
  }

  public get token(): string | null {  // Getter para obtener el token
    return this.currentUserValue ? this.currentUserValue.token : null;
  }

}

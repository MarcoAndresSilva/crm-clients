import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, Subject } from 'rxjs';
import { Client, PaginatedClientsResponse } from '../models/client.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = `${environment.apiUrl}/clients`; // defino la url base de la API de clientes

  private _clientsUpdated$ = new Subject<void>(); // crea un pulso o señal para notificar clientes actualizados


constructor( private http: HttpClient) { } // inyectamos HttpClient

  get clientsUpdated$(): Observable<void> {
    return this._clientsUpdated$.asObservable();
  }

  // GET /api/client
  getClients(page: number, limit: number): Observable<PaginatedClientsResponse> {
    console.log(`Servicio: Obteniendo pagina ${page} de clientes desde el backend...`);
    return this.http.get<PaginatedClientsResponse>(this.apiUrl,{
      params: {
        page: page.toString(),
        limit: limit.toString()
      }
    }).pipe(
        catchError(this.handleError)
    );
  }

  // POST /api/clients
  addClient(client: Client): Observable<Client> {
    console.log('Servicio: Obteniendo clientes desde el backend...');
    return this.http.post<Client>(this.apiUrl, client).pipe(
      catchError(this.handleError)
    );
  }

  // GET /api/clients/:id
  getClientById(id: string): Observable<Client> { 
    console.log('Servicio: Obteniendo clientes desde el backend...');
    return this.http.get<Client>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // PUT /api/clients/:id 
  updateClient(id: string, client: Client): Observable<Client> { 
    console.log('Servicio: Actualizando clientes desde el backend...');
    return this.http.put<Client>(`${this.apiUrl}/${id}`, client).pipe(
      catchError(this.handleError)
    );
  }

  // DELETE /api/clients/:id
  deleteClient(id: string): Observable<any> {
    console.log('Servicio: Eliminando clientes desde el backend...');
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  notifyClientUpdated(): void {
    console.log('Servicio: Notificando clientes actualizados...');
    this._clientsUpdated$.next();
  }

  private handleError(error: any) {
    console.error('Servicio: Error al obtener clientes', error);
    return throwError(() => error('Algo salio mal, porfavor intentelo de nuevo mas tarde'));
  }

}
    

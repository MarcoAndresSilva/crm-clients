import { Handler } from './../../../../server/node_modules/arg/index.d';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, delay } from 'rxjs';
import { Client } from '../models/client.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = `${environment.apiUrl}/clients`; // defino la url base de la API de clientes

constructor( private http: HttpClient) { } // inyectamos HttpClient

  // GET /api/client
  getClients(): Observable<Client[]> {
    console.log('Servicio: Obteniendo clientes desde el backend...');
    return this.http.get<Client[]>(this.apiUrl).pipe(
      delay(500), // TODO: Eliminar este retardo en producción. Usado solo para probar el spinner.
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

  private handleError(error: any) {
    console.error('Servicio: Error al obtener clientes', error);
    return throwError(() => error('Algo salio mal, porfavor intentelo de nuevo mas tarde'));
  }

  // TODO : Mejorar el manejo de errores

}
    

import { Injectable } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clients: Client[] = [
    {id: '64a5f3e4c3d4e5a6b7c8d9e0', name: 'Juan Pérez', company: 'Tech Solutions', email: 'juan.perez@tech.com', phone: '+56911111111', createdAt: new Date()},
    {id: '64a5f3e4c3d4e5a6b7c8d9e1', name: 'Ana Gómez', company: 'Innovate Corp', email: 'ana.gomez@innovate.com', createdAt: new Date()},
    {id: '64a5f3e4c3d4e5a6b7c8d9e2', name: 'Carlos Sánchez', company: 'Marketing Digital', email: 'carlos@marketing.cl', phone: '+56933333333', createdAt: new Date()},
  ];

constructor() { }

  // GET /api/client
  getClients(): Observable<Client[]> {
    console.log('Servicio: Obteniendo clientes...');
    
    return of(this.clients).pipe( // of() convierte el array en un Observable
      delay(1000),
      tap(clients => console.log('Servicio: Clientes obtenidos', clients)) // tap() ejecuta una función sin modificar el Observable
    );
  }

  // POST /api/clients
  addClient(client: Client): Observable<Client> {
    console.log('Servicio: Agregando cliente...', client);
    
    const newClient: Client = {
      ...client, // copia las propiedades del objeto client y las agrega al nuevo objeto
      id: `64a5f3e4c3d4e5a6b7c8d9e3${this.clients.length + 3}`, // id unico y falso
      createdAt: new Date()
    };

    this.clients.push(newClient);

    return of(newClient).pipe(
      delay(1000) // simula la latencia de una petición HTTP
    );
  }

  //TODO  
  // getClientById(id: string): Observable<Client> { ... }
  // updateClient(id: string, client: Client): Observable<Client> { ... }
  // deleteClient(id: string): Observable<any> { ... }



}
    

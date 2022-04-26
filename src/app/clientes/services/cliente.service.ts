import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Cliente } from '../interfaces/cliente.interface';
import { CLIENTES } from '../data/cliente.data';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES)
    return this.http.get<Cliente[]>(this.urlEndPoint);
  }
}

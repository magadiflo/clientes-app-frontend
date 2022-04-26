import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Cliente } from '../interfaces/cliente.interface';
import { CLIENTES } from '../data/cliente.data';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]> {
    return of(CLIENTES);
  }
}

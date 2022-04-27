import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, catchError, throwError, map } from 'rxjs';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

import Swal from 'sweetalert2';

import { Cliente } from '../interfaces/cliente.interface';
import { CLIENTES } from '../data/cliente.data';

const BAD_REQUEST: number = 400;

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getClientes(): Observable<Cliente[]> {
    //return of(CLIENTES)
    return this.http.get<Cliente[]>(this.urlEndPoint)
      .pipe(
        map((clientes: Cliente[]) => clientes.map((cliente: Cliente) => {
          cliente.nombre = cliente.nombre?.toUpperCase();
          cliente.createAt = formatDate(cliente.createAt!, 'dd-MM-yyyy', 'en-US');
          return cliente;
        }))
      );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<{ cliente: Cliente, mensaje: string }>(this.urlEndPoint, cliente, { headers: this.httpHeaders })
      .pipe(
        map(({ cliente }) => cliente),
        catchError(e => {
          if (e.status == BAD_REQUEST) {
            return throwError(() => e);
          }
          console.log(e);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }

  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError(e => {
          console.log(e);
          this.router.navigate(['/clientes']);
          Swal.fire('Error al obtener el cliente', e.error.mensaje, 'error');
          return throwError(() => e);
        })
      );
  }

  update(cliente: Cliente): Observable<Cliente> {
    return this.http.put<{ cliente: Cliente, mensaje: string }>(`${this.urlEndPoint}/${cliente.id}`, cliente, { headers: this.httpHeaders })
      .pipe(
        map(({ cliente }) => cliente),
        catchError(e => {
          if (e.status == BAD_REQUEST) {
            return throwError(() => e);
          }
          console.log(e);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<String> {
    return this.http.delete<{ mensaje: string, error?: string }>(`${this.urlEndPoint}/${id}`, { headers: this.httpHeaders })
      .pipe(
        map(({ mensaje }) => mensaje),
        catchError(e => {
          console.log(e);
          Swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }


}

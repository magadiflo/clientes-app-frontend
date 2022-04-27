import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { Cliente } from '../interfaces/cliente.interface';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes!: Cliente[];

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cargarClientes();
  }
  
  cargarClientes(): void {
    this.clienteService.getClientes()
      .subscribe(clientes => this.clientes = clientes);
  }

  delete(cliente: Cliente): void {
    Swal.fire({
      title: `¿Seguro que desea eliminar al cliente ${cliente.nombre}?`,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id!)
          .subscribe(data => {  
            this.cargarClientes();
            Swal.fire('Cliente Eliminado', `${cliente.nombre} eliminado con éxito!`, 'success');
          });
      }
    })
  }

}

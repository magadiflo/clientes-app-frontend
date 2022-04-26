import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Cliente } from '../interfaces/cliente.interface';
import { ClienteService } from '../services/cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  titulo: string = 'Crear cliente';
  cliente: Cliente = { nombre: '', apellido: '', email: '' };

  constructor(
    private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit(): void {
  }

  create(): void {
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Cliente ${cliente.nombre} creado con éxito!`,
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

}

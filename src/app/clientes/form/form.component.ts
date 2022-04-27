import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  errores: string[] = [];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        if (id) {
          this.clienteService.getCliente(id)
            .subscribe(cliente => this.cliente = cliente);
        }
      });
  }

  create(): void {
    this.validaCampos();
    this.clienteService.create(this.cliente)
      .subscribe({
        next: cliente => {
          this.router.navigate(['/clientes']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Cliente ${cliente.nombre} creado con éxito!`,
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: e => {
          this.errores = e.error.errors as string[];
          console.log('Código del error desde el backend ' + e.status);
          console.log(this.errores);          
        }
      });
  }

  update(): void {
    this.validaCampos();
    this.clienteService.update(this.cliente)
      .subscribe({
        next: cliente => {
          this.router.navigate(['/clientes']);
          Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: `Cliente ${cliente.nombre} actualizado con éxito!`,
            showConfirmButton: false,
            timer: 1500
          });
        },
        error: e => {
          this.errores = e.error.errors as string[];
          console.log('Código del error desde el backend ' + e.status);
          console.log(this.errores);          
        }
      });
  }

  validaCampos() {
    if (this.cliente.nombre?.trim() === '') {
      delete this.cliente.nombre;
    }
    if (this.cliente.email?.trim() === '') {
      delete this.cliente.email;
    }
  }

}

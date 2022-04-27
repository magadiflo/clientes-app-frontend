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
        if(id){
          this.clienteService.getCliente(id)
            .subscribe(cliente => this.cliente = cliente);
        }
      });
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

  update(): void {
    this.clienteService.update(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire({
          position: 'top-end',
          icon: 'info',
          title: `Cliente ${cliente.nombre} actualizado con éxito!`,
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

}

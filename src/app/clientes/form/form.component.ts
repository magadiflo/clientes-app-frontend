import { Component, OnInit } from '@angular/core';

import { Cliente } from '../interfaces/cliente.interface';
import { ClienteService } from '../services/cliente.service';
import { Router } from '@angular/router';

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
      .subscribe(cliente => this.router.navigate(['/clientes']));
  }

}

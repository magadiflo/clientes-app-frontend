import { Component, OnInit } from '@angular/core';
import { Cliente } from '../interfaces/cliente.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  titulo: string = 'Crear cliente';
  cliente: Cliente = { nombre: '', apellido: '', email: '' };

  constructor() { }

  ngOnInit(): void {
  }

  create(): void {
    console.log(this.cliente);  
  }

}

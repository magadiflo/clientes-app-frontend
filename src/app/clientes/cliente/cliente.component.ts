import { Component, OnInit } from '@angular/core';

import { Cliente } from '../interfaces/cliente.interface';
import { CLIENTES } from '../data/cliente.data';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = CLIENTES;

  constructor() { }

  ngOnInit(): void {
  }

}

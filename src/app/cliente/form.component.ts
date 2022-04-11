import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public cliente:Cliente = new Cliente();
  public errores:string[];
  constructor(private acticatedRoute:ActivatedRoute,
    private clienteService:ClienteService,
    private router:Router,

    ) { }

  ngOnInit(): void {
    this.cargarCliente();
  }

  /*cargar cliente en el form[3]*/
  cargarCliente(): void {
    this.acticatedRoute.params.subscribe(params => {
      let id = params['id'];
      if(id){
        this.clienteService.obtenerClientePorId(id)
        .subscribe((cliente) => {
          this.cliente = cliente
        })
      }
    })
  }

  crearCliente(): void {
    this.clienteService.crearCliente(this.cliente)
    .subscribe(json=>{
      this.router.navigate(['/clientes'])
      swal('Nuevo Cliente', `${json.mensaje}`, 'success')
    },
    err=>{
      this.errores = err.error.errors as string[];
    }
    );
  }

  actualizarCliente(): void {
    this.clienteService.actualizarCliente(this.cliente)
    .subscribe(json=>{
      this.router.navigate(['/clientes'])
      swal('Cliente',  `${json.mensaje}`, 'success')
    },
    err=>{
      this.errores = err.error.errors as string[];
    }
    )
  }

}

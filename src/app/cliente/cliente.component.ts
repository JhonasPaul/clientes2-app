import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ModalService } from './detalle/modal.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  clientes: Cliente[];
  paginador:any;
  /* modal[2] --> cliente.component.html*/
  clienteSeleccionado:Cliente;


  constructor(private clienteService:ClienteService,
    private acticatedRoute:ActivatedRoute,
    private modalService:ModalService) { }

  ngOnInit(): void {
    this.acticatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0
      }
      this.clienteService.listarClientes(page)
      .subscribe(response => {
        this.clientes = response.content as Cliente[];
        this.paginador = response;
      });
    });
     /* EventEmitter[4] /* so elcliente de la tabla es igual al cliente que estamos emitiendo, se atualizara la foto -->*/
     this.modalService.notidicarUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(clienteOriginal => {

        if(cliente.id === clienteOriginal.id){
          /* al cliente orginal le pasamos la foto actualizada */
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      })
     })
  }

  delete(cliente: Cliente): void {
    swal({
      title: 'Estas Seguro?',
      text: `Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!',
      cancelButtonText: 'Cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.eliminarCliente(cliente.id).subscribe(
          response => {

            this.clientes = this.clientes.filter(cli => cli !== cliente)
        swal(
          'Cliente Eliminado!',
          `Cliente ${cliente.nombre} Eliminado con exito.`,
          'success'
        )
      }
    )

  }
})
}

/* MODAL[5] toma el cliente al clial se ahce click y se lo asigna al atributo clienteSelecionado  -->cliente.component.html*/
abrirModal(cliente:Cliente){
  this.clienteSeleccionado = cliente
  /* MODAL[8]  */
  /* invocams el moetodo abrir modal de la clase servisModal  --> detallecomponent.ts*/
  this.modalService.abrirModal();
}
}


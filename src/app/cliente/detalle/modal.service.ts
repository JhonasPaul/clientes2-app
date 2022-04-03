import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  /* MODAL[7]  -->cliente.component.ts*/
modal:boolean = false;
/* EventEmitter[1] */
private _notidicarUpload = new EventEmitter<any>();

  constructor() { }

  /* EventEmitter[2] --->detalle.component.ts */
  get notidicarUpload(): EventEmitter<any>{
    return this._notidicarUpload;
  }


  abrirModal(){
    this.modal = true;
  }

  cerrarModal(){
    this.modal = false;
  }
}

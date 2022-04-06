import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';


import { Cliente } from './cliente';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
/* union mediante ruta */
  private urlEndPoind:string ="http://localhost:8085/api/clientes"
  /* crear - para tranformar a json */
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient,
    private router: Router) { }

    /* PAGINADOR[2] */
  /* Listar [1]  --->cliente.component.ts*/
  listarClientes(page :number): Observable<any> {
    return this.http.get(this.urlEndPoind + '/page/' + page);
  }

  /* cargar los datos en el formulario cliente para editar mediante el id  --> form.component.ts*/
  /*[1]validar getCliente(solo se modifica en cliente.servicio.ts) back-front - importar catchError*/
  obtenerClientePorId(id:number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoind}/${id}`)
    /*captar error desde el back*/
    .pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        /* e=exepcion, error=atributo de exception que contiene el error, mensaje viene del back*/
        swal("Error al editar", e.error.message, 'error');
        return throwError(e);
      })
    )
  }

/* crear cliente */
  /*validar create[1] back-front, cambia a tipo any  para que no salga unidated en el sweetAlert --> cliente.component.ts*/
  crearCliente(cliente:Cliente): Observable<any> {
    return this.http.post<any>(this.urlEndPoind, cliente, {headers : this.httpHeaders})
    .pipe(
      catchError(e => {
        if(e.status === 404){
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }

   /* ACTUALIZAR  --> form.component.ts*/
  actualizarCliente(cliente:Cliente):Observable<any> {
    return this.http.put<any>(`${this.urlEndPoind}/${cliente.id}`, cliente, {headers: this.httpHeaders})
    .pipe(
      catchError(e => {
        /* capturar la validacion [1]@Valid  --> form.component.ts*/
        if(e.status==404){
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }
/* ELIMINAR  --> cliente.component.ts */
  eliminarCliente(id:any):Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoind}/${id}`, {headers: this.httpHeaders})
    .pipe(
      catchError(e => {
        swal(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }

  /* subirfoto[2]   --> detalle.component.ts*/
subirFoto(archivo: File, id): Observable<Cliente>{
  /*  enviamos al foto usando FormData con doporte multiPartFormData*/
  let formData = new FormData();
  /* el mismo nombre que le pusimos en el back.end @ResquestParam("archivo") */
  formData.append("archivo", archivo);
  formData.append("id", id);
  return this.http.post(`${this.urlEndPoind}/upload`, formData).pipe(/* covierte el Observable en tipo cliente */
  /* obtiene response.put("cliente") del metodo upload  del back para converirlo en un observable de cliente*/
                      /* cliente es el atributo cliente del json de back y lo comnvertimos en untipo cliente */
    map((response: any) => response.cliente as Cliente),
    catchError(e =>{
      /* error es el objeto de rror y mensaje es el mensaje de eror del bacck de catch*/
      swal(e.error.mensaje, e.error.error, 'error')
      return throwError(e);
    })
  );
}

}

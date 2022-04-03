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

  private urlEndPoind:string ="http://localhost:8085/api/clientes"
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http:HttpClient,
    private router: Router) { }

  listarClientes(page :number): Observable<any> {
    return this.http.get(this.urlEndPoind + '/page/' + page);
  }

  obtenerClientePorId(id:number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoind}/${id}`)
    .pipe(
      catchError(e => {
        this.router.navigate(['/clientes'])
        swal("Error al editar", e.error.message, 'error');
        return throwError(e);
      })
    )
  }

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

  actualizarCliente(cliente:Cliente):Observable<any> {
    return this.http.put<any>(`${this.urlEndPoind}/${cliente.id}`, cliente, {headers: this.httpHeaders})
    .pipe(
      catchError(e => {
        if(e.status==404){
          return throwError(e);
        }
        swal(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }

  eliminarCliente(id:any):Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoind}/${id}`, {headers: this.httpHeaders})
    .pipe(
      catchError(e => {
        swal(e.error.mensaje, e.error.error, 'error')
        return throwError(e);
      })
    )
  }

  /* subirfoto[7]   --> detalle.component.ts*/
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
